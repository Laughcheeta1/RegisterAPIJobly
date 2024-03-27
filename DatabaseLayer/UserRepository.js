const connectDb = require('../db.js');

const initialize = async () => {
    db = await connectDb();

    const logLogin = async (dbId) => {
        await db.collection('logins').insertOne({ user: dbId, session_start: new Date() });
    }

    const getBasicEmployerInfo = async (email) => {
        return await db.collection('Employer').findOne({ email }, { projection: { _id: 1, username: 1, password: 1 } });
    }

    const getBasicProviderInfo = async (email) => {
        return await db.collection('Provider').findOne({ email }, { projection: { _id: 1, username: 1, password: 1 } });
    }

    const emailInUse = async (email) => {
        return await db.collection('Employer').countDocuments({ "email" : { "$eq" : email } }) > 0 || await db.collection('Provider').countDocuments({ "email" : { "$eq" : email } }) > 0;
    }

    const registerEmployer = async (registerInfo) => {
        await db.collection('Employer').insertOne(registerInfo);
    }

    const registerProvider = async (registerInfo) => {
        await db.collection('Provider').insertOne(registerInfo);
    }

    return {
        logLogin,
        getBasicEmployerInfo,
        getBasicProviderInfo,
        emailInUse,
        registerEmployer,
        registerProvider
    };
};


module.exports = initialize