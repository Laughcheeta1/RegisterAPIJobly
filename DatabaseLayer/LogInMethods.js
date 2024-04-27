const getLoginMethods = (db) => 
{
    const logEmployerLogin = async (dbId) => {
        await db.collection('EmployerLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const logProviderLogin = async (dbId) => {
        await db.collection('ProviderLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const getBasicEmployerInfo = async (email) => {
        return await db.collection('Employer').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1 } });
    };

    const getBasicProviderInfo = async (email) => {
        return await db.collection('Provider').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1 } });
    };

    return {
        logEmployerLogin,
        logProviderLogin,
        getBasicEmployerInfo,
        getBasicProviderInfo
    };
}

module.exports = getLoginMethods;