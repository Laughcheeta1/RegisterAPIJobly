const NoRefreshTokenProvidedException = require('../Errors/NoRefreshTokenProvidedException');
const NotValidRefreshTokenException = require('../Errors/NotValidRefreshTokenException');
const UnvalidRoleException = require('../Errors/UnvalidRoleException');

const { unEncriptRefreshToken, generateRefreshToken, generateAccessToken } = require('../JWT/Jwt');

const roles = require('../Extra/roles.json');

const getTokenLogic = (repository) =>
{
    /*
    * Input: refreshToken
    * Output: { "AccessToken" : accessToken, "RefreshToken" : refreshToken }
    * This method is used to generate a new access token and refresh token
    */
    const generateNewToken = async (refreshToken, res) => {    
        if (!refreshToken) 
            throw new NoRefreshTokenProvidedException();

        // validate that the refresh token exists
        if (!await repository.lookForRefreshToken(refreshToken)) 
            throw new NotValidRefreshTokenException();
        
        // Get the dbId from the refresh token
        const tokenContent = unEncriptRefreshToken(refreshToken); 
        
        if (tokenContent.role === roles.employer)
            basicInfo = await repository.getBasicEmployerInfoByDbId(tokenContent.dbId);  // Get the basic info
        else if (tokenContent.role === roles.provider)
            basicInfo = await repository.getBasicProviderInfoByDbId(tokenContent.dbId);  // Get the basic info
        else if (tokenContent.role === roles.admin)
            basicInfo = await repository.getAdminInfoByDbId(tokenContent.dbId);  // Get the basic info
        else
            throw new UnvalidRoleException();
    
        // delete basicInfo.password;  // Delete the password from the basic info

        // TODO: define if the refresh token should be deleted and a new one generated

        // // Delete the old refresh token
        // await repository.deleteRefreshToken(tokenContent.dbId);
        // // Generate a new refresh token
        // refreshToken = generateRefreshToken({ 
        //                     "dbId" : tokenContent.dbId,
        //                     "role" : tokenContent.role,
        //                 });
        // await repository.saveRefreshToken(refreshToken, tokenContent.dbId);  // Save the new refresh token

        // Return both the new access token and the new refresh token
        res.cookie("A_Token", generateAccessToken({ "dbId" : basicInfo.dbId, "role" : tokenContent.role, "email": basicInfo.email }), {
            httpOnly: true, 
            //secure: true,
            sameSite: "None"  // TODO: Change this to only certain origins (Probably using CORS, idk)
        });

        return {
            "name" : basicInfo.name,
            "role" : basicInfo.role
        }
    };

    return {
        generateNewToken
    };
}

module.exports = getTokenLogic;