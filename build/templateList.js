/**
 * entry 模板使用js 入口文件
 * filename 模板出口文件
 * template 模板入口文件
 * chunks 模板使用的全部js文件
 * 
 * 指定构建模板
 * export NODE_BUILD=index&&npm run build
 */

module.exports = {
  index: {
    entry: './src/index/index.js',
    filename: './index.html',
    template: 'template/index/index.html',
    chunks: ['index', 'common', 'index']
  },
  list: {
    entry: './src/list/index.js',
    filename: './list.html',
    template: 'template/list/index.html',
    chunks: ['list']
  },
  page: {
    entry: './src/page/index.js',
    filename: './page.html',
    template: 'template/page/index.html',
    chunks: ['page']
  }
}