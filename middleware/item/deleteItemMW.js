var requireOption = require('../common').requireOption;

/*
 * Delete specific item from the specific shoppinglist
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {

        var ListModel = requireOption(objectRepository, 'listModel');

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
    };

};