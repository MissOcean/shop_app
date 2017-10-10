let axios = require('axios'),
  http = require('http'),
  fs = require('fs'),
  url = require('url');
const itemUrl = 'https://m.you.163.com/item/list?categoryId=1005001',
  homeUrl = 'https://m.you.163.com/',
  detailUrl = 'http://m.you.163.com/item/detail?id=1241017',
  commentUrl = 'http://m.you.163.com/item/comment?id=1241017',
  commentGooodRateUrl = 'http://m.you.163.com/xhr/comment/itemGoodRates.json',
  commentTagsUrl = 'http://m.you.163.com/xhr/comment/tags.json',
  commentByTagUrl = 'http://m.you.163.com/xhr/comment/listByItemByTag.json?tag=%E5%85%A8%E9%83%A8&itemId=1241017&page=1'
let querystring = require('querystring')
// console.log(querystring.stringify({itemId:1241017}))
http.createServer((req, res) => {
  let {pathname, query} = url.parse(req.url, true);
  if (pathname === '/') {
    let rs = fs.createReadStream('index.html');
    rs.pipe(res);
  }
  else if (pathname === '/axios.js') {
    res.setHeader('content-type', 'text/javascript;charset=utf-8');

    let rs = fs.createReadStream('axios.js');
    rs.pipe(res);
  }
  else if (pathname === '/item') {
    axios.get(itemUrl).then(axios_res => {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(axios_res.data));
    }).catch(e => console.log(e));
  }
  else if (pathname === '/home') {
    axios.get(homeUrl).then(axios_res => {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(axios_res.data));
    }).catch(e => console.log(e));
  }
  else if (pathname === '/detail') {
    axios.get(detailUrl).then(axios_res => {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(axios_res.data));
    }).catch(e => console.log(e));
  }

  else if (pathname === '/comment') {
    axios.get(commentUrl).then(axios_res => {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(axios_res.data));
    }).catch(e => console.log(e));
  }
  else if (pathname === '/commentRate') {
    axios.post(commentGooodRateUrl, querystring.stringify({itemId: 1241017}),)
      .then(axios_res => {
        console.log(axios_res)
        res.setHeader('content-type', 'application/json;charset=utf-8');
        res.end(JSON.stringify(axios_res.data));
      }).catch(e => console.log(e));
  }
  else if (pathname === '/commentTags') {
    axios.post(commentTagsUrl, querystring.stringify({itemId: 1241017})).then(axios_res => {
      console.log(axios_res.data)
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(axios_res.data));
    }).catch(e => console.log(e));
  }
  else if (pathname === '/commentByTag') {
    axios.get(commentByTagUrl).then(axios_res => {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(axios_res.data));
    }).catch(e => console.log(e));
  }
  else if (pathname == '/proxyUrl') {
    let url = query.url;
    axios.get(url).then(axios_res=>{
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(axios_res.data));
    }).catch(e => console.log(e));
  }
  else {
    res.end('404')
  }
}).listen(8888, () => {
  console.log('server is listening on port 8888')
});


