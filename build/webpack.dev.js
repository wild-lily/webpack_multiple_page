const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const WebpackNotifierPlugin = require('webpack-notifier')

// webpack hot reload 配置
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(webpackConfig.entry[name])
})

module.exports = merge(webpackConfig, {
  mode: 'development',
  devServer: {
    timeout: 100
  },
  module: {
    rules: [
      {
        test: /\.(css|styl)$/,
        use: ["style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"' },
      'DEV': true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // 标签提示构建信息
    new WebpackNotifierPlugin({ alwaysNotify: true })
  ]
})