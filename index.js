const fs = require('fs'),
    http = require('http'),
    url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

console.log(laptopData);

const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname,
        id = url.parse(req.url, true).query.id;

    console.log(id);

    if( pathName === '/products' || pathName === '/' ) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end('This is the product');
    } else if( pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end('This is the laptop');
    } else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('Not Found !');
    }
    
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening on port 1337...')
});