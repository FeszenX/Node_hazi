/*
 * Render the page
 */

module.exports = function (objectRepository, viewName) {

    return function (req, res, next) {
        return res.render(viewName, res.tpl);
    };

};