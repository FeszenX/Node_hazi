/*
 * Get the list of the shopping lists to the logged in user
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {
        var itemArray = [
            { name: 'Lista 1', id: 1 },
            { name: 'Lista 2', id: 2 }
        ];

        res.tpl.lists = itemArray;

        return next();
    };

};