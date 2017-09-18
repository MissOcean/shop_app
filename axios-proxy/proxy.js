let axios = require('axios'),
    http = require('http'),
    fs = require('fs'),
    url = require('url');
const itemUrl = 'https://m.you.163.com/item/list?categoryId=1005001',
    homeUrl = 'https://m.you.163.com/';
http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);
    if (pathname === '/') {
        let rs = fs.createReadStream('index.html');
        rs.pipe(res);
    }
    else if (pathname === '/item') {
        axios.get(itemUrl).then(axios_res => {
            res.setHeader('content-type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(axios_res.data));
        }).catch(e => console.log(e));
    } else if (pathname === '/home') {
        axios.get(homeUrl).then(axios_res => {
            res.setHeader('content-type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(axios_res.data));
        }).catch(e => console.log(e));
    } else {
        res.end('404')
    }
}).listen(8888, () => {
    console.log('server is listening on port 8888')
});


