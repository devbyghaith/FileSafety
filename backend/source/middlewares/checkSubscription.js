const TableManager = require("../database/table-manager");

const SubscriptionsManager = new TableManager("subscriptions");

module.exports = async function(request, response, next) {
    let apiUser = (response.locals.apiUser || request.user);
    let isUserSubscribed = await SubscriptionsManager.doesRowExist({ User: apiUser.Id });

    if (isUserSubscribed) {
        let userSubscription = await SubscriptionsManager.fetchRow({ User: apiUser.Id });

        if (userSubscription.EndsAt) {
            let todaysData = new Date();
            let expirationDate = new Date(userSubscription.EndsAt);
            let expirationLocaleDate = expirationDate.toLocaleDateString();
            let todaysLocaleDate = todaysData.toLocaleDateString();
            
            if (expirationLocaleDate == todaysLocaleDate) {
                await SubscriptionsManager.deleteRow({ User: apiUser.Id });

                return response.status(403).json({
                    error: true,
                    message: "Forbidden",
                    data: {},
                });
            } else return next();
        } else return next();
    } else return response.status(403).json({
        error: true,
        message: "Forbidden",
        data: {},
    });
};