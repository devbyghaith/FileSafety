const TableManager = require("../database/table-manager");

module.exports = function (table, key, art) {
    let tableManager = new TableManager(table);
    
    return async function(request, response, next) {
        let apiUser = (response.locals.apiUser || request.user);

        tableManager.doesRowExist({ User: apiUser.Id }).then((doesRowExist) => {
            if (doesRowExist) {
                tableManager[art ? art : "fetchRows"]({ User: apiUser.Id })
                .then((result) => {
                    request.user[key] = result;
            
                    next();
                }).catch((error) => {
                    return response.status(500).json({
                        error: true,
                        message: "Internal Server Error",
                        data: {},
                    });
                });
            } else {
                request.user[key] = null;
                
                next();
            };
        }).catch((error) => {
            return response.status(500).json({
                error: true,
                message: "Internal Server Error",
                data: {},
            });
        });
    };
}