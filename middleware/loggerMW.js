module.exports = function (objectRepository, text) {

    return function (req, res, next) {
        console.log(text);
        return next();
    };

};