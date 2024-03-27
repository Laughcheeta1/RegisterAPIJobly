const exceptionHandler = (error, req, res, next) => {
    // The "||" is for, if the error does not have that property, it will return the default value (the one on the right)
    res.status(error.statusCode || 500).json(
        {
            error : error.name || "Internal Server Error",
            message : error.message || "An unexpected error occurred"
        }
    ).send();
}

module.exports = exceptionHandler;