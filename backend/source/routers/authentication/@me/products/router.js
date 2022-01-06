const Express = require("express");

const Router = Express.Router();

Router.get("/", (request, response) => {
    return response.status(200).json({
        error: false,
        message: "OK",
        data: request.user.Products
    });
});

module.exports = Router;