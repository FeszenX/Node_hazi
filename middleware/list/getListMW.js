var requireOption = require('../common').requireOption;

/*
 * Get the chosen shoppinglist
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {

        if ((typeof req === 'undefined') || (typeof req.params === 'undefined') ||
            (typeof req.params.listid === 'undefined')) {
            return next();
        }

        var listModel = requireOption(objectRepository, 'listModel');

        var listId = req.params.listid;

        listModel.findOne({
            _id: listId
        }, function (err, result) {

            if ((err) || (!result)) {
                return next();
            }

            var itemArray = [];

            result.item.forEach(function (currentValue) {
                itemArray.push(currentValue);
            });

            res.tpl.listItems = itemArray;
            res.tpl.listId = listId;

            return next();

        });


    };

};