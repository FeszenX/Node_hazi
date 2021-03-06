var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {

        if ((typeof req.param('userid') === 'undefined') || (req.param('userid') === 'null' )) {
            return next();
        }

        userModel.findOne({_id: req.param('userid')}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.tpl.user = result;

            return next();
        });
    };
};