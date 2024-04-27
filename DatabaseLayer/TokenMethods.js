const getTokenMethods = (db) =>
{
    const deleteRefreshToken = async (dbId) => {
        await db.collection('RefreshToken').deleteMany({ user: dbId });
    }

    const saveRefreshToken = async (refreshToken, dbId) => {
        await db.collection('RefreshToken').insertOne({ user: dbId, token: refreshToken });
    }

    const lookForRefreshToken = async (refreshToken) => {
        return await db.collection('RefreshToken')
            .findOne({
                    // It suffices to look for only the token since if the user was different, the token would be different
                        "token" : { "$eq" : refreshToken } 
                    });
    }

    return {
        deleteRefreshToken,
        saveRefreshToken,
        lookForRefreshToken
    };
}

module.exports = getTokenMethods;