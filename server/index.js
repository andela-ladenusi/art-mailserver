var express = require('express'),
    routes = require('./routes'),
    bodyParser = require('body-parser'),
    multipart = require('connect-multiparty');

var STATIC_PATH = './static',
    app = express(),
    port = process.env.PORT || 7000;

app.use('/static', express.static(STATIC_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multipart());
app.use(routes);
app.set('views', 'views');
app.engine('html', require('ejs').renderFile);
app.use(express.static('static'));

app.listen(port);
console.log('Listening on port ' + port + '...');