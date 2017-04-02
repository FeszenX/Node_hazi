/*
 * Get information if the user is logged out
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };

};