if (typeof console?.clear == "function") console.clear();

const ExpressSettings = require("../settings/express.json");

const PassportInitializer = require("./utils/passport-initializer");

const Passport = require("passport");
const Session = require("express-session");
const Express = require("express");
const Colors = require("colors");
const Cors = require("cors");
const Path = require("path");
const Fs = require("fs");

const App = Express();

PassportInitializer(Passport);

App.set("trust proxy", true);
App.set("views", Path.join(__dirname, "views"));

App.use(Express.json());
App.use(Express.urlencoded(ExpressSettings.Parser));
App.use(Express.static(Path.join(__dirname, "public")));
App.use(Session(ExpressSettings.Session));
App.use(Passport.initialize());
App.use(Passport.session());
App.use(Cors({ credentials: true,origin: "http://localhost:3000" }));

App.use((request, response, next) => {
    var requestAddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    var requestFullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;

    response.locals.requestAddress = requestAddress;
    response.locals.requestFullUrl = requestFullUrl;

    next();
});

((routersPath) => {
    if (Fs.existsSync(routersPath)) {
        Fs.readdirSync(routersPath)
        .filter((routerDirectory) => Fs.lstatSync(Path.join(routersPath, routerDirectory)).isDirectory())
        .forEach((routerDirectory) => {
            var router = require(Path.join(routersPath, routerDirectory, "router"));

            try {
                App.use((`/${routerDirectory}`), router);
                console.log(Colors.green("ROUTERS"), (`<${Colors.green(`/${routerDirectory}`)}> router initialized`));
            } catch (error) {
                console.log(Colors.red("ROUTERS"), Colors.red(`/${routerDirectory}`), error);
            };
        });
    } else console.log(Colors.red("HANDLER"), (`<${Colors.red(routersPath)}> does not exist`));
})(Path.join(__dirname, "routers"));

App.use((request, response) => {
    return response.sendFile(Path.join(__dirname, "views", "index.html"));
});

App.listen(ExpressSettings.Port, ExpressSettings.Host, () => {
    console.log(Colors.cyan("EXPRESS"), (`Listening to requests on <${Colors.cyan(ExpressSettings.Host)}:${Colors.cyan(ExpressSettings.Port)}>`));
});