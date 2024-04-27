const getLoginMethods = (db) => 
{
    const logLogin = async (dbId) => {
        await db.collection('Logins').insertOne({ user: dbId, session_start: new Date() });
    }

    const getBasicEmployerInfo = async (email) => {
        return await db.collection('Employer').findOne({ "email" : { "$eq" : email } }, { projection: { _id: 1, name: 1, password: 1 } });
    }

    const getBasicProviderInfo = async (email) => {
        return await db.collection('Provider').findOne({ "email" : { "$eq" : email } }, { projection: { _id: 1, name: 1, password: 1 } });
    }

    return {
        logLogin,
        getBasicEmployerInfo,
        getBasicProviderInfo
    };
}

module.exports = getLoginMethods;