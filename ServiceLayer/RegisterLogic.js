const ExistingEmailException = require('../Errors/ExistingEmailException');

const registerValidation = require('./validations');

const getRegisterLogic = (repository) => 
{
    const registerEmployer = async (registerInfo) => {
        if (!registerValidation.validateRegister(registerInfo))
            throw new Error('Invalid username'); // TODO: Define If we are doing this

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingEmailException(registerInfo.email);                      
                                                    
        repository.registerEmployer(registerInfo);
    };

    const registerProvider = async (registerInfo) => {
        if (!registerValidation.validateRegister(registerInfo))
            throw new Error('Invalid username or password'); // TODO: define if we are doing this

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingUsernameException();

        repository.registerProvider(registerInfo);
    };

    return {
        registerEmployer,
        registerProvider
    };
};

module.exports = getRegisterLogic;