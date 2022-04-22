// const MailersSettings = require("../../../settings/mailers.json");

const checkAuthentication = require("../../middlewares/checkAuthentication");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const MailTransporter = require("../../utils/mail-transporter");
const TableManager = require("../../database/table-manager");

const Passport = require("passport");
const Bcryptjs = require("bcryptjs");
const Express = require("express");
const Colors = require("colors");
const Path = require("path");
const Fs = require("fs");

// const SystemMailer = new MailTransporter(MailersSettings.System);
const VerificationsManager = new TableManager("verifications");
const UsersManager = new TableManager("users");
const LogsManager = new TableManager("logs");

const Router = Express.Router();

Router.get("/logout", isAuthenticated, async (request, response) => {
    try {
        await request.logOut();

        response.status(200).json({
            error: false,
            message: "OK",
            data: {},
        })
    } catch (error) {
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            data: {},
        });
    };
});

Router.post("/login", async (request, response, next) => {
    try {
        Passport.authenticate("local", function(error, user, info) {
            if (error) {
                return response.status(500).json({
                    error: true,
                    message: info?.message ? info.message : "Internal Server Error",
                    data: {},
                });
            } else {
                if (user?.Id) {
                    request.logIn(user, async (error) => {
                        if (error) {
                            return response.status(500).json({
                                error: true,
                                message: "Internal Server Error",
                                data: {},
                            });
                        } else return response.redirect("/authentication/@me");
                    });
                } else {
                    return response.status(400).json({
                        error: true,
                        message: info.message,
                        data: {},
                    });
                };
            };
        })(request, response, next);
    } catch (error) {
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            data: {},
        });
    };
});

Router.post("/register", async (request, response) => {
    try {
        let specifiedUsername = request.body?.Username;
        let specifiedPassword = request.body?.Password;
        let specifiedEmail = request.body?.Email;

        if (specifiedUsername?.length && specifiedPassword?.length && specifiedEmail?.length) {
            let users = await UsersManager.fetchRows(null, null, null);
            let usersFilter = users?.filter?.((user) => user.Username?.toLowerCase?.() == specifiedUsername?.toLowerCase?.() || user.Email?.toLowerCase?.() == specifiedEmail?.toLowerCase?.());

            if (usersFilter?.length) {
                return response.status(409).json({
                    error: true,
                    message: "Username or Email Address is already in use",
                    data: {},
                });
            } else {
                let generatedSalt = await Bcryptjs.genSalt(10);
                let hashedPassword = await Bcryptjs.hashSync(specifiedPassword, generatedSalt);
                let verificationCode = (Math.random() + 1).toString(36).substring(6);

                let createdUser = await UsersManager.insertRow({ Username: specifiedUsername, Password: hashedPassword, Email: specifiedEmail });
                
                await VerificationsManager.insertRow({ User: createdUser.Id, Code: verificationCode });

                SystemMailer.sendMail({ from: MailersSettings.System.auth.user, to: specifiedEmail, subject: "FileSafety.Co - Complete registration", html: (`<div style="background-color: #242830;font-family: Arial, Helvetica, sans-serif;color: #FFFFFF;display: flex;flex-direction: column;padding: 1rem;"> <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;"> <div style="display: flex;flex-direction: row;align-items: center;"> <div style="background-color: #2C3039;background-image: url('https://filesafety.co/favicon.ico');background-size: cover;border-radius:100%;padding: 1.25rem;margin-right: 1rem;"></div><div style="font-weight: bold;letter-spacing: 0.5px;">FileSafety.Co</div></div><a href="http://localhost/" style="background-color: #5AC0DE;padding: 0.5rem 1rem;border-radius: 0.25rem;text-decoration: none;color: #242830;">Go to FileSafety</a> </div><div> <h2 style="color: #5AC0DE">Complete registration</h2> <div style="color: #DCDDDE;">Please enter this confirmation code in the window where you started creating your account:</div><h3 style="background-color: #1D2026;text-align: center;padding: 1rem;color: #5AC0DE;">${verificationCode}</h3> <div style="color: #DCDDDE;">If you didn't create an account on FileSafety, please ignore this message.</div></div></div>`) })
                .then(async (information) => {
                    if (information?.accepted?.includes?.(specifiedEmail)) {
                        await LogsManager.insertRow({ User: createdUser.Id, Action: "ACCOUNT_CREATED" });

                        response.status(200).json({
                            error: false,
                            message: "OK",
                            data: {},
                        });
                    } else {
                        try {
                            await UsersManager.deleteRow({ Id: createdUser.Id });

                            return response.status(400).json({
                                error: true,
                                message: "Bad Request",
                                data: {},
                            });
                        } catch (error) {
                            console.error(error);
                            return response.status(500).json({
                                error: true,
                                message: "Internal Server Error",
                                data: {},
                            });
                        };
                    };
                }).catch((error) => {
                    console.error(error);
                    return response.status(500).json({
                        error: true,
                        message: "Internal Server Error",
                        data: {},
                    });
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
});

Router.post("/verify", checkAuthentication, async (request, response) => {
    try {
        let specifiedCode = request.body?.Code;

        if (specifiedCode?.length) {
            let isCodeValid = await VerificationsManager.doesRowExist({ Code: specifiedCode, User: request.user.Id });

            if (isCodeValid) {
                await LogsManager.insertRow({ User: request.user.Id, Action: "ACCOUNT_VERIFIED" });
                await VerificationsManager.deleteRow({ Code: specifiedCode, User: request.user.Id });
                await UsersManager.updateRow({ Id: request.user.Id }, { isVerified: 1 });

                return response.status(200).json({
                    error: false,
                    message: "Verification Completed",
                    data: request.user,
                });
            } else {
                return response.status(400).json({
                    error: true,
                    message: "Invalid verification code specified",
                    data: {},
                });
            };
        } else {
            return response.status(400).json({
                error: true,
                message: "No verification code specified",
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