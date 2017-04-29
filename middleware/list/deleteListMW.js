var requireOption = require('../common').requireOption;

/*
 * Delete the chosen shoppinglist
 */

module.exports = function (objectRepository) {

    var ListModel = requireOption(objectRepository, 'listModel');

    return function (req, res, next) {
        console.log('listid: ' + req.body.listid);
        ListModel.findOne({
            _id: req.body.listid
        }, function (err, result) {
            if ((err) || (!result)) {
                res.tpl.error.push('Invalid list id');
                console.log('invalid list id');
                return next();
            }
            result.remove(function (err) {
                if (err) {
                    res.tpl.error.push('Remove failed');
                    return next();
                }
                console.log('Item removed');
            })
        });
        return next();
    };

};