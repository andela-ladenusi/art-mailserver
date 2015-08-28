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
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(routes);
app.set('views', 'views');
app.engine('html', require('ejs').renderFile);
app.use(express.static('static'));

app.listen(port);
console.log('Listening on port ' + port + '...');