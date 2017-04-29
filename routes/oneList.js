var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getListMW = require('../middleware/list/getListMW');

var getItemListMW = require('../middleware/item/getItemListMW');
var getItemMW = require('../middleware/item/getItemMW');
var deleteItemMW = require('../middleware/item/deleteItemMW');
var updateItemMW = require('../middleware/item/updateItemMW');
var addItemMW = require('../middleware/item/addItemMW');

var listModel = require('../models/list');
var userModel = require('../models/user');

var loggerMW = require('../middleware/loggerMW');

module.exports = function (app) {

    var objectRepository = {
        listModel: listModel,
        userModel: userModel
    };

    /*
     * View of specific shoppinglist
     */
    app.use('/list/:listid',
        authMW(objectRepository),
        getListMW(objectRepository),
        renderMW(objectRepository, 'list')
    );

    /*
    * The page to edit items
    */
    app.use('/items/:listid',
        authMW(objectRepository),
        getListMW(objectRepository),
        getItemListMW(objectRepository),
        renderMW(objectRepository, 'items')
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
        renderMW(objectRepository, 'items')
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