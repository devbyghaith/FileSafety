const checkAuthentication = require("../../../middlewares/checkAuthentication");
const getUserDataInTable = require("../../../middlewares/getUserDataInTable");

const Express = require("express");
const Colors = require("colors");
const Path = require("path");
const Fs = require("fs");

const Router = Express.Router();

Router.use(checkAuthentication, getUserDataInTable("products", "Products"), getUserDataInTable("activations", "Activations"), getUserDataInTable("subscriptions", "Subscription", "fetchRow"), getUserDataInTable("requests", "Requests"));
Router.get("/", async (request, response) => {
    return response.status(200).json({
        error: false,
        message: "OK",
        data: request.user
    });
});

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

module.exports = Router;