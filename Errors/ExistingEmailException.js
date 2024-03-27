class ExistingEmailException extends Error {
    constructor(email) {
        super(`Email ${email} is already in use`);
        this.name = 'ExistingEmailError';
        this.statusCode = 409; // Conflict
    }
}

module.exports = ExistingEmailException;