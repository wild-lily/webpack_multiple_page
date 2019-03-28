const webpack = require('webpack')
const path = require('path')
const express = require('express')
const http = require('http')
const proxyMiddleware = require('http-proxy-middleware')
// 粉笔
const chalk = require('chalk')

const config = require('./webpack.dev')
const proxyTable = require('./proxyTable')

const app = express()
const compiler = webpack(config)


const port = process.env.PORT || 3000

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })
compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
    hotMiddleware.publish({
        action: 'reload'
    });
});

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(context, options))
})

app.use(devMiddleware)

app.use(hotMiddleware)

// const staticPath = path.posix.join('/', 'static')
// app.use(staticPath, express.static('./static'))
app.use(express.static(__dirname + config.output.publicPath))

const server = http.createServer(app)
server.listen(port, 'localhost', function(err) {
    if (err) throw err
    // server.keepAliveTimeout = 0 //node版本号低于8.1.1  由于超时，node kill掉请求。通过设置keepalivetimeout解决超时热更新失效
    const addr = server.address()
    console.log('Listening at http://%s:%d', addr.address, addr.port)
})