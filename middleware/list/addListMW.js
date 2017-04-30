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

        newList.save();

        return res.redirect('/lists');
    };

};