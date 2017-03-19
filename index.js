var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.error = [];
    res.tpl = {};
    return next();
});

require('./routes/outside')(app);

/*
app.use('/static', express.static('static'));
*/

app.use(function (err, req, res, next) {
    res.status(500).send('Some problem');
    console.error(err.stack);
})

var server = app.listen(3000, function () {
});