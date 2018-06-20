const proxy = require('http-proxy-middleware')
module.exports = function expressMiddleware (router) {
  router.use('**/*.do', proxy({
    target: 'http://localhost:8090',
    changeOrigin: true
  }))
}