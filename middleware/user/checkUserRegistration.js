var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {

    var UserModel = requireOption(objectRepository, "userModel");

    return function (req, res, next) {

        console.log('name: ' + req.body.name);
        console.log('email: ' + req.body.email);
        console.log('pass: ' + req.body.password);
        console.log('body: ' + req.body.toString());

        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            req.body.password === 'undefined') {
            return next();
        }
        
        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {
            
            if ((err) || (result !== null)) {
                res.tpl.error.push('Your email address is already registered');
                console.log('Email in use');
                return next();
            }
            
            if (req.body.name.length < 3) {
                res.tpl.error.push('The username should be at least 3 ');
                console.log('At least 3 length name');
                return next();
            }

            var newUser = new UserModel();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            console.log(newUser);
            newUser.save(function (err) {
                console.log('Saved!');
                return res.redirect('/login');
            });
        });
    };
};