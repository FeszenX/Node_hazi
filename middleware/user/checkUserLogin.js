//var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    
    return function (req, res, next) {
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') || (typeof req.body.password === 'undefined')) {
            return next();
        }

        req.session.userid = req.body.email;

        return next();
    };
    
};