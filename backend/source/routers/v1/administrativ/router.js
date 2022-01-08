const checkAdminPermission = require("../../../middlewares/checkAdminPermission");

const Express = require("express");
const Colors = require("colors");
const Path = require("path");
const Fs = require("fs");

const Router = Express.Router();

Router.use(checkAdminPermission);

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