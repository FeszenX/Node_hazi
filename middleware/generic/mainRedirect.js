/*
 * Redirect the user
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };

};