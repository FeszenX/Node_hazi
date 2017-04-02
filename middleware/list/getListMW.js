/*
 * Get the chosen shoppinglist
 */

module.exports = function (objectRepository) {

    return function (req, res, next) {
        var itemArray = [
            { name: 'Item 1', id: 1, quantity: 10, comment: 'Some comment here.' },
            { name: 'Item 2', id: 2, quantity: 5, comment: 'Some comment here.' }
        ];

        res.tpl.listItems = itemArray;

        return next();
    };

};