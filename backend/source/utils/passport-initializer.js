const TableManager = require("../database/table-manager");

const LocalPassport = require("passport-local");
const Bcryptjs = require("bcryptjs");

const UsersManager = new TableManager("users");

module.exports = function(passport) {
    passport.use(new LocalPassport.Strategy({
        usernameField: "Username",
        passwordField: "Password",
    }, async function(username, password, done) {
        try {
            let doesExist = await UsersManager.doesRowExist({ Username: username });
            
            if (doesExist) {
                let user = await UsersManager.fetchRow({ Username: username });
                let passwordComparetion = await Bcryptjs.compare(password, user.Password);

                if (passwordComparetion) done(null, user);
                else done(null, null, { message: "Invalid authentication credentials" });
            } else done(null, null, { message: "Invalid authentication credentials" });
        } catch (error) {
            done(error, null, { message: "Internal Server error" });
        };
    }));

    passport.serializeUser((user, done) => done(null, user.Id));
    passport.deserializeUser(async (id, done) => {
        try {
            let doesExist = await UsersManager.doesRowExist({ Id: id });

            if (doesExist) done(null, (await UsersManager.fetchRow({ Id: id })));
            else done(null, null);
        } catch (error) {
            done(error, null);
        };
    });
};