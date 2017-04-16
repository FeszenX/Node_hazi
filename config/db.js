var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shoppinglist');

module.exports = mongoose;