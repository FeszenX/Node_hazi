var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getListMW = require('../middleware/list/getListMW');

var getItemListMW = require('../middleware/item/getItemListMW');
var getItemMW = require('../middleware/item/getItemMW');
var deleteItemMW = require('../middleware/item/deleteItemMW');
var updateItemMW = require('../middleware/item/updateItemMW');
var addItemMW = require('../middleware/item/addItemMW');

module.exports = function (app) {
    var objectRepository = {
        listModel: listModel,
        itemModel: itemModel
    };

    /*
     * View of specific shoppinglist
     */
    app.use('/list/:listid',
        authMW(objectRepository),
        getListMW(objectRepository),
        renderMW(objectRepository)
    );

    /*
     * Edit specific item of specific shoppinglist
     */
    app.use('/items/:listid/:itemid/save',
        authMW(objectRepository),
        getListMW(objectRepository),
        getItemListMW(objectRepository),
        getItemMW(objectRepository),
        updateItemMW(objectRepository),
        renderMW(objectRepository, 'itemmod')
    );

    /*
     * Delete specific item from specific shoppinglist
     */
    app.use('/items/:listid/:itemid/del',
        authMW(objectRepository),
        getListMW(objectRepository),
        getItemListMW(objectRepository),
        getItemMW(objectRepository),
        deleteItemMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/list/:listid');
        }
    );

};