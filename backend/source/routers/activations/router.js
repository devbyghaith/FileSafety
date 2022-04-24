const TableManager = require("../../database/table-manager");

const Express = require("express");
const Colors = require("colors");
const Path = require("path");
const Fs = require("fs");

const Router = Express.Router();

const UsersManager = new TableManager("users");
const ProductsManager = new TableManager("products");
const ActivationsManager = new TableManager("activations");
const RequestsManager = new TableManager("requests");

Router.get("/@:username", async (request, response) => {
    try {
        let username = request.params.username;
        let productId = request.query.product;
        let licenseKey = request.query.key;

        let doesUserExist = await UsersManager.doesRowExist({ Username: username });
        
        if (doesUserExist) {
            let user = await UsersManager.fetchRow({ Username: username });

            if (user?.isClient) {
                if (productId?.length) {
                    let doesProductExist = await ProductsManager.doesRowExist({ User: user.Id, Id: parseInt(productId) });

                    if (doesProductExist) {
                        let product = await ProductsManager.fetchRow({ User: user.Id, Id: parseInt(productId) });
                        let doesActivationExist = await ActivationsManager.doesRowExist({ User: user.Id, Product: parseInt(productId), Address: response.locals.requestAddress });

                        await ProductsManager.updateRow({ Id: productId }, { Requests: product.Requests + 1 });

                        if (doesActivationExist) {
                            let activation = await ActivationsManager.fetchRow({ User: user.Id, Product: parseInt(productId), Address: response.locals.requestAddress });

                            await RequestsManager.insertRow({ User: user.Id, Product: parseInt(productId), Activation: activation.Id });

                            if (activation.Key) {
                                if (activation.Key == licenseKey) return response.send("Activated");
                                else return response.send("Not activated");
                            } else {
                                if (!licenseKey) return response.send("Activated");
                                else return response.send("Not activated");
                            };
                        } else return response.send("Not activated");
                    } else return response.send("ERROR: Product does not exist");
                } else return response.send("ERROR: No product ID specified");
            } else response.send(`ERROR: ${username} is not a client`);
        } else return response.send("ERROR: User does not exist");
    } catch (error) {
        console.log(error)
        return response.send("ERROR: Internal Server Error");
    };
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