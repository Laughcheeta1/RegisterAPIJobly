const { generateJwt, generateRefreshToken } = require('../JWT/Jwt');

const UserNotValidException = require('../Errors/UserNotValidException');
const roles = require('../Extra/roles.json');

const getLoginLogic = (repository) =>
{
    const validateEmployerLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicEmployerInfoByEmail(loginInfo.email);

        if (!basicInfo || basicInfo.password !== loginInfo.password) 
            throw new UserNotValidException(); // If the email or password is incorrect, return null

        refreshToken = generateRefreshToken({ 
                            "dbId" : basicInfo.dbId,
                            "role" : roles.employer
                        });

        // We are awaiting all this things in case something goes wrong with the DB, then the login will not be completed
        /*It's better to save the refresh token with the dbId, so that we can delete it without having the previous refreshToken*/
        await repository.deleteRefreshToken(basicInfo.dbId); // Before saving a new refresh token, delete the old one
        await repository.saveRefreshToken(refreshToken, basicInfo.dbId); // Save the new refresh token

        await repository.logEmployerLogin(basicInfo.dbId);
        return {
            "AccessToken" : generateJwt({ 
                                    "dbId" : basicInfo.dbId,
                                    "role" : roles.employer,
                                    "email": basicInfo.email
                                }),
            "RefreshToken" : refreshToken,
            "name" : basicInfo.name
        };
    };

    const validateProviderLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicProviderInfoByEmail(loginInfo.email);

        if (!basicInfo || basicInfo.password !== loginInfo.password) 
            throw new UserNotValidException(); 

        repository.logProviderLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        delete basicInfo.password;
        
        refreshToken = generateRefreshToken({ 
                            "dbId" : basicInfo.dbId,
                            "role" : roles.provider
                        });
        repository.deleteRefreshToken(basicInfo.dbId); // Before saving a new refresh token, delete the old one
        repository.saveRefreshToken(refreshToken, basicInfo.dbId);
        
        await repository.logProviderLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        return {
            "AccessToken" : generateJwt({ 
                                "dbId" : basicInfo.dbId,
                                "role" : roles.provider,
                                "email": basicInfo.email
                            }),
            "RefreshToken" : refreshToken,
            "name" : basicInfo.name
        };
    };

    return {
        validateEmployerLogin,
        validateProviderLogin
    };
};

module.exports = getLoginLogic;