class NotValidRefreshTokenException extends Error {
    constructor() {
        super(`The provided refresh token is not valid`);
        this.name = 'NotValidRefreshToken';
        this.statusCode = 403; // Forbidden
    }
}

module.exports = NotValidRefreshTokenException;