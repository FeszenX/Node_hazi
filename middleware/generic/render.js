/*
 * Render the page
 */

module.exports = function (objectRepository, viewName) {

    return function (req, res, next) {
        res.render(viewName, res.tpl);
        //return next();
    };

};