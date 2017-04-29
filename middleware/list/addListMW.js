var requireOption = require('../common').requireOption;

/*
 * Add new shoppinglist to the logged in user
 */

module.exports = function (objectRepository) {

    var ListModel = requireOption(objectRepository, 'listModel');

    return function (req, res, next) {
        if (req.body === 'undefined' || req.body.newName === 'undefined' ||
            req.body.newName.length < 1) {
            console.log('Redirected /lists cause newName was empty');
            return res.redirect('/lists');
        }

        console.log('newName was not empty, contains: \"' + req.body.newName + '\"');
        console.log('Typeof newName: ' + typeof req.body.newName);
        console.log('Length of newName: ' + req.body.newName.length);

        var newList = new ListModel;
        newList.name = req.body.newName;
        newList.owner_email = req.session.email;
        item = [{}];

        newList.save();

        return res.redirect('/lists');
    };

};