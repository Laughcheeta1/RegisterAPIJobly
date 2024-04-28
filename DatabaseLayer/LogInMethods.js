const { ObjectId } = require('mongodb');

const getLoginMethods = (db) => 
{
    const logEmployerLogin = async (dbId) => {
        await db.collection('EmployerLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const logProviderLogin = async (dbId) => {
        await db.collection('ProviderLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const getBasicEmployerInfoByEmail = async (email) => {
        return await db.collection('Employer').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1 } });
    };

    const getBasicProviderInfoByEmail = async (email) => {
        return await db.collection('Provider').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1 } })
    };

    const getBasicEmployerInfoByDbId = async (dbId) => {
        return await db.collection('Employer').findOne({ "dbId" : { "$eq" : dbId } }, { projection: { dbId: 1, name: 1, password: 1 } });
    };

    const getBasicProviderInfoByDbId = async (dbId) => {
        return await db.collection('Provider').findOne({ "dbId" : { "$eq" : dbId } }, { projection: { dbId: 1, name: 1, password: 1 } })
    };

    return {
        logEmployerLogin,
        logProviderLogin,
        getBasicEmployerInfoByEmail,
        getBasicProviderInfoByEmail,
        getBasicEmployerInfoByDbId,
        getBasicProviderInfoByDbId
    };
}

module.exports = getLoginMethods;