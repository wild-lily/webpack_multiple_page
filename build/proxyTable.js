module.exports = {
  '/activity': {
    target: 'https://bbs-dev.jzb.com',
    changeOrigin: true,
    pathRewrite: {
      '^/activity': '/activity'
    }
  }
}