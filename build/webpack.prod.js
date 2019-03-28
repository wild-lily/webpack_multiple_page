const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 粉笔
const chalk = require('chalk')
// loading效果
const ora = require('ora')
// 命令操作
require('shelljs/global')

const assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ? './' : ''
  return path.posix.join(assetsSubDirectory, _path)
}

console.log(chalk.green.bold('当前运行：' + chalk.underline.green(process.env.NODE_ENV)))

const cwd = process.cwd()
const filePath = path.join(path.resolve(cwd, 'dist'), '')
console.log(chalk.yellow.bold('\n正在删除 -> ' + chalk.rgb(9, 9, 9).bgYellow.bold(filePath) + ' 目录'))
rm('-rf', filePath)
mkdir('-p', filePath)
// cp('-R', './*', filePath)

console.log(
  '\n' +
  chalk.green.bold('delete finish\n')
)

const spinner = ora('正在构建项目...')
spinner.start()

const config = merge(webpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义全局变量
      'process.env':{
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].css',
      chunkFilename: 'css/[contenthash].css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(styl|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          { loader: 'stylus-loader', options: { sourceMap: false } }
        ]
      }
    ]
  }
})

webpack(config, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
  console.log(chalk.green.bold('build finish!'))
})