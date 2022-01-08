const validateAPICredentials = require("../../middlewares/validateAPICredentials");
const checkSubscription = require("../../middlewares/checkSubscription");

const Express = require("express");
const Colors = require("colors");
const Path = require("path");
const Fs = require("fs");

const Router = Express.Router();

Router.use(validateAPICredentials, checkSubscription);

(() => {
    Fs.readdirSync(__dirname)
    .filter((routerDirectory) => Fs.lstatSync(Path.join(__dirname, routerDirectory)).isDirectory())
    .forEach((routerDirectory) => {
        var router = require(Path.join(__dirname, routerDirectory, "router"))

        try {
            Router.use((`/${routerDirectory}`), router);
        } catch (error) {
            console.log(Colors.red("ROUTERS"), Colors.red(`/${routerDirectory}`), error.message ? error.message : error);
        };
    });
})();

Router.use((request, response) => {
    return response.json({
        error: true,
        message: "Not Found",
        data: {}
    });
});

module.exports = Router;