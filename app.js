const express = require ('express');
// var CDN = require('express-simple-cdn');
var compression = require('compression')
const critical = require("critical");
const http = require('http');
const path = require ('path');

const app = express();
const port = process.env.PORT || 4200;

app.use(compression())

var CDN = "http://myproject.test"

app.locals.CDN = function(path, type, classes, alt) {
    if(type == 'js') {
        return "<script src='"+CDN+path+"' type='text/javascript'></script>";
    } else if (type == 'css') {
        return "<link rel='stylesheet' type='text/css' href='"+CDN+path+"'/>";
    } else if (type == 'img') {
        return "<img class='"+classes+"' src='"+CDN+path+"' alt='"+alt+"' />";
    } else {
        return "";
    }
};
module.exports = app;

critical.generate({
    /* The path of the Webpack bundle */
    base: path.join(path.resolve(__dirname), 'dist/xtreme-admin-angular'),
    src: 'index.html',
    dest: 'index.html',
    inline: true,
    extract: true,
    /* Ensure that bundled JS file is called */
    penthouse: {
    blockJSRequests: false,
    }
    });
app.use(express.static(path.join(__dirname + '/dist/xtreme-admin-angular')));

app.get('/*', (req,res) => res.sendFile(path.join(__dirname ,'/dist/xtreme-admin-angular/index.html' )));

const server = http.createServer(app);

server.listen(port, () => console.log ("Angular server is running ....4200.."))