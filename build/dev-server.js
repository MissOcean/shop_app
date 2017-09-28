require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()
let configs = {
  //主页数据
  recommendRoute: '/getRecommendData',
  recommendUrl: 'https://m.you.163.com/',
  //分类数据
  cateItemRoute: '/getCateItem',
  cateItemUrl: 'https://m.you.163.com/item/list',
  //商品详情
  productDetailRoute: '/getProductDetail',
  productDetailUrl: 'https://m.you.163.com/item/detail',
  //好评，post，ecodedurl
  productGoodRateRoute: '/getProductGoodRate',
  productGoodRateUrl: 'http://m.you.163.com/xhr/comment/itemGoodRates.json',
  //评价标签，post,ecodedurl
  commentTagsRoute: '/getCommentTags',
  commentTagsUrl: 'http://m.you.163.com/xhr/comment/tags.json',
  //根据tag获取评论
  commentByTagRoute: '/getCommentByTag',
  commentByTagUrl: 'http://m.you.163.com/xhr/comment/listByItemByTag.json',
}
let axios = require('axios');
let ecode = require('querystring')
//获取主页数据
apiRoutes.get(configs.recommendRoute, (req, res) => {
  let url = configs.recommendUrl;
  axios.get(url, {
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})
//获取分类数据
apiRoutes.get(configs.cateItemRoute, (req, res) => {
  let url = configs.cateItemUrl;
  axios.get(url, {
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})
//获取商品详情
apiRoutes.get(configs.productDetailRoute, (req, res) => {
  let url = configs.productDetailUrl;
  axios.get(url, {
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})
//获取商品好评度
apiRoutes.get(configs.productGoodRateRoute, (req, res) => {
  let url = configs.productGoodRateUrl;
  axios.post(url, ecode.stringify(req.query)).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})
//获取评论页标签
apiRoutes.get(configs.commentTagsRoute, (req, res) => {
  let url = configs.commentTagsUrl;
  axios.post(url, ecode.stringify(req.query)).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})
//根据tag获取评论
apiRoutes.get(configs.commentByTagRoute, (req, res) => {
  let url = configs.commentByTagUrl;
  axios.get(url, {
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})

app.use('/api', apiRoutes)
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
