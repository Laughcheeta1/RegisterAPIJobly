class UnvalidRoleException extends Error {
    constructor() {
        super(`The provided role is not valid`);
        this.name = 'UnvalidRole';
        this.statusCode = 409; // Conflict
    }
}

module.exports = UnvalidRoleException;