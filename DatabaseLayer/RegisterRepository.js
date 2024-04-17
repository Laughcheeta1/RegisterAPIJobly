const connectDb = require('../db.js');

const initialize = async () => {
    db = await connectDb();

    const deleteRefreshToken = async (dbId) => {
        await db.collection('refresh_tokens').delete({ user: dbId });
    }

    const saveRefreshToken = async (refreshToken, dbId) => {
        await db.collection('refresh_tokens').insertOne({ user: dbId, token: refreshToken });
    }

    const lookForRefreshToken = async (refreshToken, dbId) => {
        return await db.collection('refresh_tokens')
            .findOne({ "$and" : [ 
                        { "token" : { "$eq" : refreshToken } } , 
                        { "user" : { "$eq" : dbId } } 
                    ]});
    }

    const logLogin = async (dbId) => {
        await db.collection('logins').insertOne({ user: dbId, session_start: new Date() });
    }

    const getBasicEmployerInfo = async (email) => {
        return await db.collection('Employer').findOne({ "email" : { "$eq" : email } }, { projection: { _id: 1, role: 1, username: 1, password: 1 } });
    }

    const getBasicProviderInfo = async (email) => {
        return await db.collection('Provider').findOne({ "email" : { "$eq" : email } }, { projection: { _id: 1, role: 1, username: 1, password: 1 } });
    }

    const emailInUse = async (email) => {
        return await db.collection('Employer').countDocuments({  }) > 0 || await db.collection('Provider').countDocuments({ "email" : { "$eq" : email } }) > 0;
    }

    const registerEmployer = async (registerInfo) => {
        await db.collection('Employer').insertOne(registerInfo);
    }

    const registerProvider = async (registerInfo) => {
        await db.collection('Provider').insertOne(registerInfo);
    }

    return {
        deleteRefreshToken,
        saveRefreshToken,
        lookForRefreshToken,
        logLogin,
        getBasicEmployerInfo,
        getBasicProviderInfo,
        emailInUse,
        registerEmployer,
        registerProvider
    };
};


module.exports = initialize