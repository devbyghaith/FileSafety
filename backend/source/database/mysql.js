const MySQLSettings = require("../../settings/mysql.json");

const Colors = require("colors");
const MySQL = require("mysql2");

const MySQLConnection = MySQL.createConnection({
    database: MySQLSettings.Data,
    host    : MySQLSettings.Host,
    port    : MySQLSettings.Port,
    user    : MySQLSettings.User,
    password: MySQLSettings.Pass,
});

MySQLConnection.connect((error) => {
    if (error) {
        console.log(Colors.red("MARIADB"), ("Unable to connect with the MySQL server"));
        console.log(Colors.red("MARIADB"), error.message ? error.message : error);
    } else {
        console.log(Colors.green("MARIADB"), ("MySQL server connection established"));
    };
});

module.exports = MySQLConnection;