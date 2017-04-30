var requireOption = require('../common').requireOption;

/*
 * Add new shoppinglist to the logged in user
 */

module.exports = function (objectRepository) {

    var ListModel = requireOption(objectRepository, 'listModel');

    return function (req, res, next) {
        if (req.body === 'undefined' || req.body.newName === 'undefined' ||
            req.body.newName.length < 1) {
            return res.redirect('/lists');
        }

        var newList = new ListModel;
        newList.name = req.body.newName;
        newList.owner_email = req.session.email;
        newList.item = [];

        var oneItem = {
            name: 'hello',
            quantity: 1,
            comment: 'No comment'
        };

        newList.item.push(oneItem);

        var oneItem = {
            name: 'asd',
            quantity: 12,
            comment: 'No comment 2'
        };

        newList.item.push(oneItem);

        newList.save();

        return res.redirect('/lists');
    };

};