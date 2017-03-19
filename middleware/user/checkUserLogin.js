var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    
    return function (req, res, next) {
        return next();
    };
    
};