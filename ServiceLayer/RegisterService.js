repositoryInitializer = require('../DatabaseLayer/RegisterRepository');
ExistingEmailException = require('../Errors/ExistingEmailException');
UserNotValidException = require('../Errors/UserNotValidException');
const loginValidation = require('./validations');

const initializer = async () => {
    const repository = await repositoryInitializer();

    const validateEmployerLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicProviderInfo(loginInfo.email);

        if (!basicInfo || basicInfo.password !== loginInfo.password) 
            throw new UserNotValidException(); // If the email or password is incorrect, return null

        repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        delete basicInfo.password; // The password should no be sent to the client

        return basicInfo;
    }

    const validateProviderLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicProviderInfo(loginInfo.email);

        if (!basicInfo || basicInfo.password !== loginInfo.password) 
            throw new UserNotValidException(); 

        repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        delete basicInfo.password;
        
        return basicInfo;
    }

    const registerEmployer = async (registerInfo) => {
        if (!loginValidation.validateRegister(registerInfo))
            throw new Error('Invalid username or password'); // TODO: create a custom exception for this

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingEmailException(registerInfo.email); // TODO: It is working, but now I have to handle it to return an error to the client,
                                                    // instead of crashing the server                        
                                                    
        repository.registerEmployer(registerInfo);
    }

    const registerProvider = async (registerInfo) => {
        if (!loginValidation.validateRegister(registerInfo))
            throw new Error('Invalid username or password'); // TODO: create a custom exception for this

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