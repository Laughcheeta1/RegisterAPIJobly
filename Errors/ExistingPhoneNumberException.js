class ExistingPhoneNumberException extends Error {
    constructor(phoneNumber) {
        super(`The phone number ${phoneNumber} is already in use`);
        this.name = 'ExistingPhoneNumberError';
        this.statusCode = 409; // Conflict
    }
}

module.exports = ExistingPhoneNumberException;