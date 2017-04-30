var requireOption = require('../common').requireOption;

/*
 * Add new item to the specific shoppinglist
 */

module.exports = function (objectRepository) {

    var ListModel = requireOption(objectRepository, 'listModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.name === 'undefined') ||
            (typeof req.body.quantity === 'undefined') || (typeof req.body.comment === 'undefined') ||
            (req.body.name.length < 1)) {
            res.tpl.error.push('Something missing');
            return res.redirect('/list/' + req.params.listid);
        }

        var tempList = new ListModel;

        ListModel.findOne({
            _id: req.params.listid
        }, function (err, result) {
            if (err) {
                res.tpl.error.push('Error in database request');
            }
            if (result) {
                tempList._id = result._id;
                tempList.name = result.name;
                tempList.owner_email = result.owner_email;
                tempList.item = result.item;
                var oneItem = {
                    name: req.body.name,
                    quantity: req.body.quantity,
                    comment: req.body.comment
                };
                tempList.item.push(oneItem);

                result.remove(function (err) {
                    if (err) {
                        res.tpl.error.push('Remove failed');
                        return next();
                    }
                    tempList.save();
                    return res.redirect('/list/' + req.params.listid);
                });


            }
        })
    };

};