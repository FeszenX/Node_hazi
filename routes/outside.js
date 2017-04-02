var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var renderMW = require("../middleware/generic/render");

module.exports = function (app) {

    /*
    var objectRepository = {
        userModel: userModel
    };
    */

    var objectRepository;

    /*
     * Main page
     */
    app.get('/',
        mainRedirectMW(objectRepository),
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

};