var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var getListListMW = require('../middleware/list/getListListMW');
var getListMW = require('../middleware/list/getListListMW');
var addListMW = require('../middleware/list/addListMW');
var deleteListMW = require('../middleware/list/deleteListMW');

module.exports = function (app) {
    /*
    var objectRepository = {
        listModel: listModel
    };
    */

    var objectRepository;

    /*
     * List of shoppinglists
     */
    app.use('/lists',
        authMW(objectRepository),
        getListListMW(objectRepository),
        renderMW(objectRepository)
    );

    /*
     * Add new shoppinglist
     */
    app.use('/lists/new',
        authMW(objectRepository),
        addListMW(objectRepository),
        renderMW(objectRepository)
    );

    /*
     * Delete specific task
     */
    app.use('/list/:listid/delete',
        authMW(objectRepository),
        getListMW(objectRepository),
        deleteListMW(objectRepository),
        renderMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/lists');
        }
    );

};