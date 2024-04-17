// The errors
ExistingEmailException = require('../Errors/ExistingEmailException');
UserNotValidException = require('../Errors/UserNotValidException');
const NoRefreshTokenProvidedException = require('../Errors/NoRefreshTokenProvidedException');
const NotValidRefreshTokenException = require('../Errors/NotValidRefreshTokenException');

repositoryInitializer = require('../DatabaseLayer/RegisterRepository');
const loginValidation = require('./validations');
const { generateJwt, generateRefreshToken } = require('../JWT/Jwt');


const initializer = async () => {
    const repository = await repositoryInitializer();

    // Only returns acces token,
    const validateEmployerLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicEmployerInfo(loginInfo.email);

        if (!basicInfo || basicInfo.password !== loginInfo.password) 
            throw new UserNotValidException(); // If the email or password is incorrect, return null

        refreshToken = generateRefreshToken({ 
                            "dbId" : basicInfo.dbId,
                            "role" : "Employer" // TODO: Change this to a number with a Json file
                        });
        repository.deleteRefreshToken(basicInfo.dbId); // Before saving a new refresh token, delete the old one
        repository.saveRefreshToken(refreshToken, basicInfo.dbId);

        repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        return {
            "AccessToken" : generateJwt({ 
                                    "dbId" : basicInfo.dbId,
                                    "role" : "Employer" // TODO: Change this to a number with a Json file
                                }),
            "RefreshToken" : refreshToken,
            "userName" : basicInfo.username
        };
    }

    const validateProviderLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicProviderInfo(loginInfo.email);

        if (!basicInfo || basicInfo.password !== loginInfo.password) 
            throw new UserNotValidException(); 

        repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        delete basicInfo.password;
        
        refreshToken = generateRefreshToken({ 
                            "dbId" : basicInfo.dbId,
                            "role" : "Provider" // TODO: Change this to a number with a Json file
                        });
        repository.deleteRefreshToken(basicInfo.dbId); // Before saving a new refresh token, delete the old one
        repository.saveRefreshToken(refreshToken, basicInfo.dbId);
        
        return {
            "AccessToken" : generateJwt({ 
                                "dbId" : basicInfo.dbId,
                                "role" : "Provider" // TODO: Change this to a number with a Json file
                            }),
            "RefreshToken" : refreshToken
        };
    }

    const registerEmployer = async (registerInfo) => {
        if (!loginValidation.validateRegister(registerInfo))
            throw new Error('Invalid username'); // TODO: Define If we are doing this

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingEmailException(registerInfo.email);                      
                                                    
        repository.registerEmployer(registerInfo);
    }

    const registerProvider = async (registerInfo) => {
        if (!loginValidation.validateRegister(registerInfo))
            throw new Error('Invalid username or password'); // TODO: define if we are doing this

        if (await repository.emailInUse(registerInfo.email)) 
            throw new ExistingUsernameException();

        repository.registerProvider(registerInfo);
    }

    const generateNewToken = async (refreshToken, basicInfo) => {
        if (!refreshToken) 
            throw new NoRefreshTokenProvidedException();

        const token = await repository.lookForRefreshToken(refreshToken, basicInfo.dbId);
        if (!token) 
            throw new NotValidRefreshTokenException();

        const basicInfo = await repository.getBasicEmployerInfo(token.user);
        if (!basicInfo) throw new Error('User not found');

        return {
            "AccessToken" : generateJwt(basicInfo),
            "RefreshToken" : refreshToken
        };
    }

    return {
        validateEmployerLogin,
        validateProviderLogin,
        registerEmployer,
        registerProvider
    }
};

module.exports = initializer;