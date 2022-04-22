// const MailersSettings = require("../../../../../settings/mailers");

const MailTransporter = require("../../../../utils/mail-transporter")
const TableManager = require("../../../../database/table-manager");

const Bcryptjs = require("bcryptjs");
const Express = require("express");

// const SystemMailer = new MailTransporter(MailersSettings.System);
const VerificationsManager = new TableManager("verifications");
const UsersManager = new TableManager("users");

const Router = Express.Router();

Router.get("/", async (request, response) => {
    try {
        let users = await UsersManager.fetchRows(null, null, null);

        return response.status(200).json({
            error: false,
            message: "OK",
            data: users,
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
        let specifiedEmail = request.body?.Email;
        let specifiedUsername = request.body?.Username;
        let specifiedPassword = request.body?.Password;

        if (specifiedUsername?.length && specifiedPassword?.length && specifiedEmail?.length) {
            let users = await UsersManager.fetchRows();
            let usersFilter = users.filter?.((user) => user.Username?.toLowerCase?.() == specifiedUsername?.toLowerCase?.() || user.Email?.toLowerCase?.() == specifiedEmail?.toLowerCase?.());

            if (usersFilter?.length) {
                return response.status(422).json({
                    error: true,
                    message: "Unprocessable Entity",
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
                        response.status(200).json({
                            error: false,
                            message: "OK",
                            data: createdUser,
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
                            return response.status(500).json({
                                error: true,
                                message: "Internal Server Error",
                                data: {},
                            });
                        };
                    };
                }).catch((error) => {
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

Router.get("/:userId", async (request, response) => {
    try {
        let userId = request.params.userId;
        let users = await UsersManager.fetchRows({ Id: userId }, null, null);

        if (users?.length) {
            return response.status(200).json({
                error: false,
                message: "OK",
                data: users[0],
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

Router.delete("/:userId", async (request, response) => {
    try {
        let userId = request.params.userId;
        let users = await UsersManager.fetchRows({ Id: userId }, 1, null);

        if (users?.length) {
            await UsersManager.deleteRow({ Id: userId });

            return response.status(200).json({
                error: false,
                message: "OK",
                data: users[0],
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

Router.patch("/:userId", async (request, response) => {
    try {
        let userId = request.params.userId;
        
        var supportedColumns = ["Language", "isAdministrator", "isVerified", "isDisabled"];
        var columnsToUpdate = Object.keys(request.body).filter((key) => supportedColumns.includes(key));

        let doesExist = await UsersManager.doesRowExist({ Id: userId });

        if (columnsToUpdate?.length) {
            if (doesExist) {
                let user = await UsersManager.fetchRow({ Id: userId });
                let valuesToUpdate = Object.keys(user).filter((key) => columnsToUpdate.includes(key) && user[key] != request.body[key]);
                let newValues = {};

                valuesToUpdate.forEach((key) => newValues[key] = request.body[key]);

                let newUser = await UsersManager.updateRow({ Id: userId}, newValues);

                return response.status(200).json({
                    error: false,
                    message: "OK",
                    data: newUser,
                });
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
        console.log(error)
        return response.status(500).json({
            error: true,
            message: "Internal Server Error",
            data: {},
        });
    };
});

Router.patch("/:userId/verify", async (request, response) => {
    try {
        let userId = request.params.userId;
        let verificationCode = request.query.code;
        let users = await UsersManager.fetchRows({ Id: userId }, 1, null);

        if (users?.length && verificationCode?.length) {
            let user = users[0];
            
            if (user.isVerified) {
                return response.status(200).json({
                    error: false,
                    message: "OK",
                    data: users[0],
                });
            } else {
                let verification = await VerificationsManager.fetchRow({ User: user.Id });

                if (verificationCode == verification.Code) {
                    await VerificationsManager.deleteRow({ Id: verification.Id });
                    await UsersManager.updateRow({ Id: user.Id }, { isVerified: 1 });

                    return response.status(200).json({
                        error: false,
                        message: "OK",
                        data: users[0],
                    });
                } else {
                    return response.status(400).json({
                        error: true,
                        message: "Bad Request",
                        data: {},
                    });
                };
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

module.exports = Router;