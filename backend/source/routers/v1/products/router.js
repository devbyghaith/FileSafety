const TableManager = require("../../../database/table-manager");

const Express = require("express");

const Router = Express.Router();

const ProductsManager = new TableManager("products");

Router.get("/", async (request, response) => {
    try {
        let apiUserProducts = await ProductsManager.fetchRows({ User: response.locals.apiUser.Id }, null, null);

        return response.status(200).json({
            error: false,
            message: "OK",
            data: apiUserProducts,
        });
    } catch (error) {
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            data: {},
        });
    };
});

Router.post("/", async (request, response) => {
    try {
        let specifiedName = request.body?.Name;

        let createdProduct = await ProductsManager.insertRow({ User: response.locals.apiUser.Id, Product: specifiedName || "Noname" });

        return response.status(200).json({
            error: false,
            message: "OK",
            data: createdProduct,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            data: {},
        });
    };
});

Router.patch("/", async (request, response) => {
    try {
        let specifiedId = request.body?.Id;
        let specifiedName = request.body?.Name;

        let doesProductExist = await ProductsManager.doesRowExist({ User: response.locals.apiUser.Id, Id: specifiedId });

        if (doesProductExist) {
            let product = await ProductsManager.fetchRow({ User: response.locals.apiUser.Id, Id: specifiedId });
            let updatedProduct = await ProductsManager.updateRow({ Id: product.Id }, { Name: specifiedName || "Noname" });

            console.log(updatedProduct)

            return response.status(200).json({
                error: true,
                message: "OK",
                data: {
                    old: product,
                    new: updatedProduct,
                },
            });
        } else {
            return response.status(400).json({
                error: true,
                message: "Bad Request",
                data: {},
            });
        };
    } catch (error) {
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            data: {},
        });
    };
});

Router.delete("/", async (request, response) => {
    try {
        let specifiedId = request.body?.Id;

        let doesProductExist = await ProductsManager.doesRowExist({ User: response.locals.apiUser.Id, Id: specifiedId });

        if (doesProductExist) {
            let product = await ProductsManager.fetchRow({ User: response.locals.apiUser.Id, Id: specifiedId });

            await ProductsManager.deleteRow({ Id: product.Id });

            return response.status(200).json({
                error: false,
                message: "OK",
                data: product,
            });
        } else {
            return response.status(400).json({
                error: true,
                message: "Bad Request",
                data: {},
            });
        };
    } catch (error) {
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            data: {},
        });
    };
});

module.exports = Router;