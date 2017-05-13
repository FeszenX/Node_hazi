var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});

require('./routes/outside')(app);
require('./routes/listList')(app);
require('./routes/oneList')(app);

app.use(function (err, req, res, next) {
    res.status(500).send('Some problem');
    console.error(err.stack);
});

var port = 3000;

var server = app.listen(port, function () {
    console.log('Listening on localhost:' + port);
});