const ExistingEmailException = require('../Errors/ExistingEmailException');
const ExistingPhoneNumberException = require('../Errors/ExistingPhoneNumberException');

const bcrypt = require('bcrypt');

const registerValidation = require('./validations');

const getRegisterLogic = (repository) => 
{
    const registerEmployer = async (registerInfo) => {
        if (!registerValidation.validateRegister(registerInfo))
            throw new Error('Invalid username'); // TODO: Define If we are doing this

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingEmailException(registerInfo.email);
        
        if (await repository.phoneNumerInUse(registerInfo.phoneNumber))
            throw new ExistingPhoneNumberException(registerInfo.phoneNumber);

        registerInfo.password = await bcrypt.hash(registerInfo.password, 10);  // Encrypt the password
        repository.registerEmployer(registerInfo);
    };

    const registerProvider = async (registerInfo) => {
        if (!registerValidation.validateRegister(registerInfo))
            throw new Error('Invalid username or password'); // TODO: define if we are doing this

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingEmailException(registerInfo.email);

        if (await repository.phoneNumerInUse(registerInfo.phoneNumber))
            throw new ExistingPhoneNumberException(registerInfo.phoneNumber);

        registerInfo.password = await bcrypt.hash(registerInfo.password, 10);  // Encrypt the password
        repository.registerProvider(registerInfo);
    };

    return {
        registerEmployer,
        registerProvider
    };
};

module.exports = getRegisterLogic;