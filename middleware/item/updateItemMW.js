var requireOption = require('../common').requireOption;

/*
 * Update the edited item
 */

module.exports = function (objectRepository) {

    var ListModel = requireOption(objectRepository, 'listModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.name === 'undefined') ||
            (typeof req.body.quantity === 'undefined') || (typeof req.body.comment === 'undefined') ||
            (req.body.name.length < 1)) {
            res.tpl.error.push('Something missing');
            return res.redirect('/items/' + req.params.listid);
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

                var index;

                for (var i = 0; i < tempList.item.length; i++) {
                    if (tempList.item[i]._id.toString() === req.params.itemid.toString()) {
                        index = i;
                        break;
                    }
                }

                tempList.item.splice(index, 1);

                var oneItem = {
                    name: req.body.name,
                    quantity: req.body.quantity,
                    comment: req.body.comment
                };

                tempList.item.splice(index, 0, oneItem);

                result.remove(function (err) {
                    if (err) {
                        res.tpl.error.push('Remove failed');
                        return next();
                    }
                    tempList.save();
                    return res.redirect('/items/' + req.params.listid);
                });


            }
        })
    }
};