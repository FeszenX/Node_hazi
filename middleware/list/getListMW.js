var requireOption = require('../common').requireOption;

/*
 * Get the chosen shoppinglist
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {

        var listModel = requireOption(objectRepository, 'listModel');

        var itemArray = [];

        var listId = req.params.listid;

        listModel.findOne({
            _id: listId
        }, function (err, result) {
            if (err) {
                return next();
            }
            if (result) {
                result.item.forEach(function (currentValue) {
                    itemArray.push(currentValue);
                });
                res.tpl.listItems = itemArray;
                res.tpl.listId = listId;

                return next();
            }
            return next();

        });



    };

};