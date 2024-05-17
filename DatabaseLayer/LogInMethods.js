const getLoginMethods = (db) => 
{
    const logAdminLogin = async (dbId) => {
        await db.collection('AdminLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const logEmployerLogin = async (dbId) => {
        await db.collection('EmployerLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const logProviderLogin = async (dbId) => {
        await db.collection('ProviderLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const getAdminInfoByEmail = async (email) => {
        return await db.collection('Admin').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1, email: 1 } });
    };

    const getAdminInfoByDbId = async (dbId) => {
        return await db.collection('Admin').findOne({ "dbId" : { "$eq" : dbId } }, { projection: { dbId: 1, name: 1, password: 1, email: 1 } });
    };

    const getBasicEmployerInfoByEmail = async (email) => {
        return await db.collection('Employer').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1, email: 1 } });
    };

    const getBasicProviderInfoByEmail = async (email) => {
        return await db.collection('Provider').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1, email: 1 } })
    };

    const getBasicEmployerInfoByDbId = async (dbId) => {
        return await db.collection('Employer').findOne({ "dbId" : { "$eq" : dbId } }, { projection: { dbId: 1, name: 1, password: 1, email: 1 } });
    };

    const getBasicProviderInfoByDbId = async (dbId) => {
        return await db.collection('Provider').findOne({ "dbId" : { "$eq" : dbId } }, { projection: { dbId: 1, name: 1, password: 1, email: 1 } })
    };

    return {
        logAdminLogin,
        logEmployerLogin,
        logProviderLogin,
        getAdminInfoByEmail,
        getAdminInfoByDbId,
        getBasicEmployerInfoByEmail,
        getBasicProviderInfoByEmail,
        getBasicEmployerInfoByDbId,
        getBasicProviderInfoByDbId
    };
}

module.exports = getLoginMethods;