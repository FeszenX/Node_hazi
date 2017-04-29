/*
 * Get the list of the shopping lists to the logged in user
 */
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    var listModel = requireOption(objectRepository, 'listModel');

    return function (req, res, next) {
        var itemArray = [];

        listModel.find({}, function (err, results) {
            if (err) {
                return next();
            }
            if (results) {
                results.forEach(function (currentValue) {
                    if (req.session.email === currentValue.owner_email) {
                        itemArray.push(currentValue);
                    }
                });
            }

            res.tpl.lists = itemArray;

            return next();

        });


    };

};