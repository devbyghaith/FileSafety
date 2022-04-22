module.exports = (request, response, next) => {
    try {
        let isAuthenticated = request?.isAuthenticated?.();

        if (isAuthenticated) return next();
        else return response.status(403).json({
            error: true,
            message: "You need to be logged in to access this page",
            data: {},
        });
    } catch (error) {
        return response.status(500).json({
            error: true,
            message: "An unexpected error occurred",
            data: {},
        });
    };
};