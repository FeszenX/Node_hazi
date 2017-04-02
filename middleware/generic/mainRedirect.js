/*
 * Redirect the user
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/lists');
        }
    };

};