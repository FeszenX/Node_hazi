var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Shoppinglist = db.model('Shoppinglist', {
    name: String,
    owner: Number,
    item: {
        name: String,
        quantity: Number,
        comment: String
    },
    id: Number
});