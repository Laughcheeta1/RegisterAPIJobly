const { generateAccesToken, generateRefreshToken } = require('../JWT/Jwt');

const bcrypt = require('bcrypt');

const UserNotValidException = require('../Errors/UserNotValidException');
const roles = require('../Extra/roles.json');

const getLoginLogic = (repository) =>
{
    const validateEmployerLogin = async (loginInfo, res) => {
        basicInfo = await repository.getBasicEmployerInfoByEmail(loginInfo.email);

        if (!basicInfo || !bcrypt.compare(loginInfo.password, basicInfo.password))
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

        // Get the refresh token
        res.cookie("R_Token", refreshToken, { 
            httpOnly: true,
            //secure: true, 
            sameSite: "Strict", // The refresh token only needs to be accesed by the RegisterAPI
            maxAge: 86400000  // Refresh token only lasts 24 hours (1000 * 60 * 60 * 24)
        });

        // Get the access token
        res.cookie("A_Token", generateAccesToken({ "dbId" : basicInfo.dbId, "role" : roles.employer, "email": basicInfo.email }), {
            httpOnly: true, 
            //secure: true,
            sameSite: "None"  // TODO: Change this to only certain origins (Probably using CORS, idk)
        });
        
        // Give the response's body
        res.json({
            "name" : basicInfo.name,
            "role" : roles.employer
        });
    };

    const validateProviderLogin = async (loginInfo, res) => {
        basicInfo = await repository.getBasicProviderInfoByEmail(loginInfo.email);

        if (!basicInfo || !bcrypt.compare(loginInfo.password, basicInfo.password))
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

        res.cookie("R_Token", refreshToken, { 
            httpOnly: true,
            //secure: true,  //TODO: create secure connection to enable this
            sameSite: "Strict", // The refresh token only needs to be accesed by the RegisterAPI
            maxAge: 86400000  // Refresh token only lasts 24 hours (1000 * 60 * 60 * 24)
        });

        // Get the access token
        res.cookie("A_Token", generateAccesToken({ "dbId" : basicInfo.dbId, "role" : roles.provider, "email": basicInfo.email }), {
            httpOnly: true, 
            //secure: true,
            sameSite: "None"  // TODO: Change this to only certain origins (Probably using CORS, idk)
        });

        res.json({
            "name" : basicInfo.name,
            "role" : roles.provider
        });
    };

    return {
        validateEmployerLogin,
        validateProviderLogin
    };
};

module.exports = getLoginLogic;