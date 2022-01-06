module.exports = function(request, response, next) {
    let isAdministrator = (response.locals.apiUser || request.user)?.isAdministrator;

    if (isAdministrator) next();
    else response.status(403).json({
        error: true,
        message: "Forbidden",
        data: {},
    });
};