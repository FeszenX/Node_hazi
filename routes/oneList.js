var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getListMW = require('../middleware/list/getListMW');

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
     * Add new item
     */
    app.use('/items/:listid/add',
        loggerMW(objectRepository, '/items/:listid/add REACHED'),
        addItemMW(objectRepository)
    );

    /*
     * View of specific shoppinglist
     */
    app.use('/list/:listid',
        loggerMW(objectRepository, '/list/:listid REACHED'),
        authMW(objectRepository),
        getListMW(objectRepository),
        renderMW(objectRepository, 'list')
    );

    /*
     * Edit specific item of specific shoppinglist
     */
    app.use('/items/:listid/:itemid/save',
        loggerMW(objectRepository, '/items/:listid/:itemid/save REACHED'),
        authMW(objectRepository),
        getListMW(objectRepository),
        getItemMW(objectRepository),
        updateItemMW(objectRepository),
        renderMW(objectRepository, 'items')
    );

    /*
     * Delete specific item from specific shoppinglist
     */
    app.use('/items/:listid/:itemid/del',
        loggerMW(objectRepository, '/items/:listid/:itemid/del REACHED'),
        authMW(objectRepository),
        getListMW(objectRepository),
        getItemMW(objectRepository),
        deleteItemMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/list/:listid');
        }
    );

    /*
     * The page to edit items
     */
    app.use('/items/:listid',
        loggerMW(objectRepository, '/list/:listid REACHED'),
        authMW(objectRepository),
        getListMW(objectRepository),
        renderMW(objectRepository, 'items')
    );


};