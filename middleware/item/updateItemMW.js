var requireOption = require('../common').requireOption;

/*
 * Update the edited item
 */

module.exports = function (objectRepository) {

    var listModel = requireOption(objectRepository, 'listModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.name === 'undefined') ||
            (typeof req.body.quantity === 'undefined') || (typeof req.body.comment === 'undefined') ||
            (req.body.name.length < 1)) {
            res.tpl.error.push('Something missing');
            return res.redirect('/items/' + req.params.listid);
        }

        listModel.findOne({
            _id: req.params.listid
        }, function (err, result) {

            if ((err) || (!result)) {
                res.tpl.error.push('Error in database request');
                return res.redirect('/items/' + req.params.listid);
            }

            var index = 0;

            for (var i = 0; i < result.item.length; i++) {
                if (result.item[i]._id.toString() === req.params.itemid.toString()) {
                    index = i;
                    break;
                }
            }

            result.item.splice(index, 1);

            var oneItem = {
                name: req.body.name,
                quantity: req.body.quantity,
                comment: req.body.comment
            };

            result.item.splice(index, 1, oneItem);

            result.save(function (err) {
                return res.redirect('/items/' + req.params.listid);
            });

        })
    }
};