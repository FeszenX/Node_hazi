var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    var UserModel = requireOption(objectRepository, "userModel");

    return function (req, res, next) {

        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            req.body.password === 'undefined') {
            return next();
        }
        
        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {
            
            if ((err) || (result !== null)) {
                res.tpl.error.push('Your email address is already registered');
                return next();
            }
            
            if (req.body.name.length < 3) {
                res.tpl.error.push('The username should be at least 3 ');
                return next();
            }

            var newUser = new UserModel();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            console.log(newUser);
            newUser.save(function (err) {
                return res.redirect('/login');
            });
        });
    };
};