var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    console.log(requireOption);

    var userModel = requireOption(objectRepository, 'userModel');
    
    return function (req, res, next) {
        console.log('email: ' + req.body.email);
        console.log('pass: ' + req.body.password);
        console.log('body: ' + req.body);
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            console.log('All undefined, next!');
            return next();
        }

        userModel.findOne({
            email: req.body.email
        }, function (err, result) {
                if ((err) || (!result)) {
                    res.tpl.error.push('Your email address is not registered!');
                    console.log('No result! result: ' + result);
                    return next();
                }

                if (result.password !== req.body.password) {
                    res.tpl.error.push('Wrong password!');
                    return next();
                }

                req.session.userid = result._id;
                req.session.email = result.email;
                console.log('logged in email: ' + result.email);

                return res.redirect('/lists');
        });
    };
};