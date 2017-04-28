var requireOption = require('../common').requrireOptions;

module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        userModel.find({}, function (err, results) {
            if (err) {
                return next();
            }

            res.tpl.users = results;

            return next();
        });
    };

};