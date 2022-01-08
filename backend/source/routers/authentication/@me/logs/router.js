const getUserDataInTable = require("../../../../middlewares/getUserDataInTable");

const Express = require("express");

const Router = Express.Router();

Router.get("/", getUserDataInTable("logs", "Logs"),(request, response) => {
    return response.status(200).json({
        error: false,
        message: "OK",
        data: request.user.Logs
    });
});

module.exports = Router;