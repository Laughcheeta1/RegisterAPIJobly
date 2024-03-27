repositoryInitializer = require('../DatabaseLayer/UserRepository');
ExistingUsernameException = require('../Errors/ExistingUsernameException');
const loginValidation = require('./validations');

const initializer = async () => {
    const repository = await repositoryInitializer();

    const validateEmployerLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicProviderInfo(loginInfo.email);

        if (basicInfo.password !== loginInfo.password) 
            return null; // If the username or password is incorrect, return null

        repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        delete basicInfo.password; // The password should no be sent to the client

        return basicInfo;
    }

    const validateProviderLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicProviderInfo(loginInfo.email);

        if (basicInfo.password !== loginInfo.password) 
            return null; 

        repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        delete basicInfo.password;
        
        return basicInfo;
    }

    const registerEmployer = async (registerInfo) => {
        if (!loginValidation.validateRegister(registerInfo))
            throw new Error('Invalid username or password');

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingUsernameException(); // TODO: It is working, but now I have to handle it to return an error to the client,
                                                    // instead of crashing the server                        
                                                    
        repository.registerEmployer(registerInfo);
    }

    const registerProvider = async (registerInfo) => {
        if (!loginValidation.validateRegister(registerInfo))
            throw new Error('Invalid username or password');

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingUsernameException();

        repository.registerProvider(registerInfo);
    }

    return {
        validateEmployerLogin,
        validateProviderLogin,
        registerEmployer,
        registerProvider
    }
};

module.exports = initializer;