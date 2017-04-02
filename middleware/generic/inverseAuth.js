/*
 * Get information if the user is logged out
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined') {
            return res.redirect('/');
        }
        return next();
    };

};