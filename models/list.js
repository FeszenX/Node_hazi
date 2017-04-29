var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Shoppinglist = db.model('Shoppinglist', {
    name: String,
    owner_email: String,
    item: [
        {
        name: String,
        quantity: Number,
        comment: String
    }
    ],
    id: Number
});

module.exports = Shoppinglist;