const NoRefreshTokenProvidedException = require('../Errors/NoRefreshTokenProvidedException');
const NotValidRefreshTokenException = require('../Errors/NotValidRefreshTokenException');


const getTokenLogic = (repository) =>
{
    const generateNewToken = async (refreshToken, dbId) => {
        // TODO: finish new token logic
        if (!refreshToken) 
            throw new NoRefreshTokenProvidedException();

        const token = await repository.lookForRefreshToken(refreshToken, dbId);
        if (!token) 
            throw new NotValidRefreshTokenException();
        
        
        
        return {
            "AccessToken" : generateJwt(basicInfo),
            "RefreshToken" : refreshToken
        };
    };

    return {
        generateNewToken
    };
}

module.exports = getTokenLogic;