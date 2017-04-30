/*
 * Get information if the user is logged in
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/');
        }
        res.tpl.username = req.session.username;
        return next();
    };

};