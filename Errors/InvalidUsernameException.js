class InvalidUsernameException extends Error {
    constructor() {
        super("Invalid username");
        this.name = 'InvalidUsernameException';
    }
}