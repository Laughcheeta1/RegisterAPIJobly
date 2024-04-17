class NoRefreshTokenProvidedException extends Error {
    constructor() {
        super(`Refresh token was not provided in the body of the request`);
        this.name = 'NoRefereshTokenProvided';
        this.statusCode = 400; // Bad Request
    }
}

module.exports = NoRefreshTokenProvidedException;