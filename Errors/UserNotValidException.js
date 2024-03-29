class UserNotValidException extends Error {
    constructor() {
        super(`The email or password is not valid`);
        this.name = 'UserNotValid';
        this.statusCode = 401; // Conflict
    }
}

module.exports = UserNotValidException;