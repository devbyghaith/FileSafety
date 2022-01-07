const TableManager = require("../database/table-manager");

const Bcryptjs = require("bcryptjs");
const Express = require("express");

const UsersManager = new TableManager("users");

module.exports = function(request, response, next) {
    let isAuthenticated = request?.isAuthenticated?.();

    if (isAuthenticated) {
        response.locals.apiUser = request.user;
        
        next();
    } else {
        let apiKeyEncoded = request.headers?.authorization;

        if (apiKeyEncoded?.length) {
            let apiKeyDecoded = Buffer.from(apiKeyEncoded, "base64").toString("utf-8");
            let [ apiUsername, ...apiPasswordKeys ] = apiKeyDecoded.split(".");
            let apiPassword = apiPasswordKeys.join(".");

            if (apiUsername?.length && apiPassword?.length) {
                UsersManager.doesRowExist({ Username: apiUsername }).then(async (doesExist) => {
                    try {
                        if (doesExist) {
                            let user = await UsersManager.fetchRow({ Username: apiUsername });
                            let passwordComparetion = await Bcryptjs.compare(apiPassword, user.Password);
        
                            if (passwordComparetion) {
                                if (user.isDisabled) {
                                    return response.status(422).json({
                                        error: true,
                                        message: "Unprocessable Entity",
                                        data: {},
                                    });
                                } else {
                                    response.locals.apiUser = user;
        
                                    next();
                                };
                            } else {
                                return response.status(400).json({
                                    error: true,
                                    message: "Bad Request",
                                    data: {},
                                });
                            };
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
                }).catch((error) => {
                    return response.status(500).json({
                        error: true,
                        message: "Internal Server Error",
                        data: {},
                    });
                });
            } else {
                return response.status(403).json({
                    error: true,
                    message: "Bad Request",
                    data: {},
                });
            };
        } else {
            return response.status(403).json({
                error: true,
                message: "Bad Request",
                data: {},
            });
        };
    };
};