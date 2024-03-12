repository = require('../DatabaseLayer/UserRepository');
ExistingUsernameException = require('../Errors/ExistingUsernameException');
const { validateRegister } = require('./validations');

const validateEmployerLogin = (loginInfo) => {
    if (repository.getEmployerPassword(loginInfo.username) === loginInfo.password) 
        return false;

    repository.logLogin(loginInfo.username);
    response = repository.getBasicProviderInfo(loginInfo.username);
    response.valid = true;
    return response;
}

const validateProviderLogin = (loginInfo) => {
    if (repository.getProviderPassword(loginInfo.username) !== loginInfo.password) 
        return false;

    repository.logLogin(loginInfo.username);
    response = repository.getBasicProviderInfo(loginInfo.username);
    response.valid = true;
    return response;
}

const registerEmployer = (registerInfo) => {
    if (!loginValidation.validateRegister(registerInfo))
        throw new Error('Invalid username or password');

    if (repository.employerExist(registerInfo.username)) 
        throw new ExistingUsernameException();

    repository.registerEmployer(registerInfo);
}

const registerProvider = (registerInfo) => {
    if (!loginValidation.validateRegister(registerInfo))
        throw new Error('Invalid username or password');

    if (repository.providerExist(registerInfo.username)) 
        throw new ExistingUsernameException();

    repository.registerProvider(registerInfo);
}

module.exports = {
    validateEmployerLogin,
    validateProviderLogin,
    registerEmployer,
    registerProvider
}
