class UserNotValidException extends Error {
    constructor() {
        super(`The username or password is not valid`);
        this.name = 'UserNotValid';
        this.statusCode = 401; // Conflict
    }
}

module.exports = UserNotValidException;