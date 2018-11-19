const fs = require('fs'),
    http = require('http'),
    url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname,
        id = url.parse(req.url, true).query.id;

    //PRODUCT OVERVIEW
    if( pathName === '/products' || pathName === '/' ) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        fs.readFile(`${__dirname}/template/template-overview.html`, 'utf-8', (err, data) => {
            let outputOverview = data;

            fs.readFile(`${__dirname}/template/template-card.html`, 'utf-8', (err, data) => {

                const cardsOutput = laptopData.map(laptop => replaceTemplate(data, laptop)).join('');
                outputOverview = outputOverview.replace(/{%CARDS%}/, cardsOutput);

                res.end(outputOverview);
            });
        });
    } 
    
    //PRODUCT DETAIL
    else if( pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});

        fs.readFile(`${__dirname}/template/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        })
    } 

    //IMAGES
    else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {

        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
           res.writeHead(200, { 'Content-type': 'image/jpg'});
           res.end(data); 
        });
    }
    
    //URL NOT FOUND
    else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('Not Found !');
    }
    
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening on port 1337...')
});

function replaceTemplate(data, laptop) {
    let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);

    return output;
}