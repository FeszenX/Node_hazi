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
        mainRedirectMW(objectRepository)
    );

    /*
     * Login page
     */
    app.use('/',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'index')
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