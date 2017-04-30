var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');
    
    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        userModel.findOne({
            email: req.body.email
        }, function (err, result) {
                if ((err) || (!result)) {
                    res.tpl.error.push('Your email address is not registered!');
                    return next();
                }

                if (result.password !== req.body.password) {
                    res.tpl.error.push('Wrong password!');
                    return next();
                }

                req.session.userid = result._id;
                req.session.email = result.email;

                return res.redirect('/lists');
        });
    };
};