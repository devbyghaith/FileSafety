module.exports = function(request, response, next) {
    let isAuthenticated = request.isAuthenticated?.();

    if (isAuthenticated) next();
    else response.status(401).json({
        error: true,
        message: "Unauthorized",
        data: {},
    });
};