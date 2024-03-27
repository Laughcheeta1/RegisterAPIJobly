class ExistingUsernameException extends Error {
    constructor() {
        super('Username already exists');
        this.name = 'ExistingUsernameError';
    }
}

module.exports = ExistingUsernameException;