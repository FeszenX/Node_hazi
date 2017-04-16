var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var logoutMW = require('../middleware/generic/logout');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var renderMW = require("../middleware/generic/render");

var listModel = require('../models/list');
var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        listModel: listModel,
        userModel: userModel
    };

    /*
     * Main page
     */
    app.get('/',
        renderMW(objectRepository, 'index')
    );

    /*
     * Login page
     */
    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    /*
     * Registration page
     */
    app.use('/register',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    /*
     * Logout and go to the main page
     */
    app.use('/logout',
        logoutMW(objectRepository)
    );

};