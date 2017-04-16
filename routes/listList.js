var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getListListMW = require('../middleware/list/getListListMW');
var getListMW = require('../middleware/list/getListListMW');
var addListMW = require('../middleware/list/addListMW');
var deleteListMW = require('../middleware/list/deleteListMW');

var listModel = require('../models/list');
var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        listModel: listModel,
        userModel: userModel
    };

    /*
     * List of shoppinglists
     */
    app.use('/lists',
        authMW(objectRepository),
        getListListMW(objectRepository),
        renderMW(objectRepository, 'lists')
    );

    /*
     * Add new shoppinglist
     */
    app.use('/lists/new',
        authMW(objectRepository),
        addListMW(objectRepository),
        renderMW(objectRepository, 'lists')
    );

    /*
     * Delete specific task
     */
    app.use('/list/:listid/delete',
        authMW(objectRepository),
        getListMW(objectRepository),
        deleteListMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/lists');
        }
    );

};