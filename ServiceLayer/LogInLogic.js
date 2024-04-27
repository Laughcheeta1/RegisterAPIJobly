const { generateJwt, generateRefreshToken } = require('../JWT/Jwt');

const UserNotValidException = require('../Errors/UserNotValidException');
const roles = require('../Extra/roles.json');

const getLoginLogic = (repository) =>
{
    const validateEmployerLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicEmployerInfo(loginInfo.email);

        if (!basicInfo || basicInfo.password !== loginInfo.password) 
            throw new UserNotValidException(); // If the email or password is incorrect, return null

        refreshToken = generateRefreshToken({ 
                            "dbId" : basicInfo.dbId
                        });

        await repository.deleteRefreshToken(basicInfo.dbId); // Before saving a new refresh token, delete the old one
        await repository.saveRefreshToken(refreshToken, basicInfo.dbId);

        await repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        return {
            "AccessToken" : generateJwt({ 
                                    "dbId" : basicInfo.dbId,
                                    "role" : roles.employer,
                                    "email": basicInfo.email
                                }),
            "RefreshToken" : refreshToken,
            "userName" : basicInfo.username
        };
    };

    const validateProviderLogin = async (loginInfo) => {
        basicInfo = await repository.getBasicProviderInfo(loginInfo.email);

        if (!basicInfo || basicInfo.password !== loginInfo.password) 
            throw new UserNotValidException(); 

        repository.logLogin(basicInfo.dbId); // First the logLogin, since it is a async function
        delete basicInfo.password;
        
        refreshToken = generateRefreshToken({ 
                            "dbId" : basicInfo.dbId,
                        });
        repository.deleteRefreshToken(basicInfo.dbId); // Before saving a new refresh token, delete the old one
        repository.saveRefreshToken(refreshToken, basicInfo.dbId);
        
        return {
            "AccessToken" : generateJwt({ 
                                "dbId" : basicInfo.dbId,
                            }),
            "RefreshToken" : refreshToken,
            "userName" : basicInfo.username,
            "role" : roles.provider
        };
    };

    return {
        validateEmployerLogin,
        validateProviderLogin
    };
};

module.exports = getLoginLogic;