repository = require('../DatabaseLayer/UserRepository');
ExistingUsernameException = require('../Errors/ExistingUsernameException');
const loginValidation = require('./validations');

const validateEmployerLogin = (loginInfo) => {
    basicInfo = repository.getBasicProviderInfo(loginInfo.email);

    if (basicInfo.password !== loginInfo.password) 
        return null; // If the username or password is incorrect, return null

    repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
    delete basicInfo.password; // The password should no be sent to the client

    return basicInfo;
}

const validateProviderLogin = (loginInfo) => {
    basicInfo = repository.getBasicProviderInfo(loginInfo.email);

    if (basicInfo.password !== loginInfo.password) 
        return null; 

    repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
    delete basicInfo.password;
    
    return basicInfo;
}

const registerEmployer = (registerInfo) => {
    if (!loginValidation.validateRegister(registerInfo))
        throw new Error('Invalid username or password');

    if (repository.emailInUse(registerInfo.username)) 
        throw new ExistingUsernameException();

    repository.registerEmployer(registerInfo);
}

const registerProvider = (registerInfo) => {
    if (!loginValidation.validateRegister(registerInfo))
        throw new Error('Invalid username or password');

    if (repository.emailInUse(registerInfo.username)) 
        throw new ExistingUsernameException();

    repository.registerProvider(registerInfo);
}

module.exports = {
    validateEmployerLogin,
    validateProviderLogin,
    registerEmployer,
    registerProvider
}
