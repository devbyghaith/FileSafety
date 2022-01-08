const TableManager = require("../../../database/table-manager");

const Express = require("express");

const Router = Express.Router();

const ActivationsManager = new TableManager("activations");

Router.get("/", async (request, response) => {
    try {
        let apiUserActivations = await ActivationsManager.fetchRows({ User: response.locals.apiUser.Id }, null, null);

        return response.status(200).json({
            error: false,
            message: "OK",
            data: apiUserActivations,
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
        let specifiedAddress = request.body?.Address;
        let specifiedExpiration = request.body?.ExpiresAt;
        let specifiedNote = request.body?.Note;
        let specifiedKey = request.body?.Key;

        let createdActivation = await ActivationsManager.insertRow({ User: response.locals.apiUser.Id, ExpiresAt: specifiedExpiration || null, Address: specifiedAddress || "0.0.0.0", Note: specifiedNote || null, Key: specifiedKey || null });

        return response.status(200).json({
            error: false,
            message: "OK",
            data: createdActivation,
        });
    } catch (error) {
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
        let specifiedAddress = request.body?.Address;
        let specifiedExpiration = request.body?.ExpiresAt;
        let specifiedNote = request.body?.Note;
        let specifiedKey = request.body?.Key;

        let doesActivationExist = await ActivationsManager.doesRowExist({ User: response.locals.apiUser.Id, Id: specifiedId });

        if (doesActivationExist) {
            let activation = await ActivationsManager.fetchRow({ User: response.locals.apiUser.Id, Id: specifiedId });
            let updatedActivation = await ActivationsManager.updateRow({ Id: activation.Id }, { ExpiresAt: specifiedExpiration || null, Address: specifiedAddress || "0.0.0.0", Note: specifiedNote || null, Key: specifiedKey || null });

            return response.status(200).json({
                error: true,
                message: "OK",
                data: {
                    old: activation,
                    new: updatedActivation,
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

        let doesActivationExist = await ActivationsManager.doesRowExist({ User: response.locals.apiUser.Id, Id: specifiedId });

        if (doesActivationExist) {
            let activation = await ActivationsManager.fetchRow({ User: response.locals.apiUser.Id, Id: specifiedId });

            await ActivationsManager.deleteRow({ Id: activation.Id });

            return response.status(200).json({
                error: false,
                message: "OK",
                data: activation,
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