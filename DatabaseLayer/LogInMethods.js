const getLoginMethods = (db) => 
{
    const logEmployerLogin = async (dbId) => {
        await db.collection('EmployerLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const logProviderLogin = async (dbId) => {
        await db.collection('ProviderLogins').insertOne({ user: dbId, session_start: new Date() });
    };

    const getBasicEmployerInfo = async (email) => {
        basicInfo = await db.collection('Employer').findOne({ "email" : { "$eq" : email } }, { projection: { _id: 1, name: 1, password: 1 } });
        basicInfo.dbId = basicInfo._id;
        delete basicInfo._id; // When create the dbId, we can delete all this.
        return basicInfo; // It is just temporal
    };

    const getBasicProviderInfo = async (email) => {
        basicInfo = await db.collection('Provider').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1 } })
        basicInfo.dbId = basicInfo._id;
        delete basicInfo._id;
        return basicInfo;
    };

    return {
        logEmployerLogin,
        logProviderLogin,
        getBasicEmployerInfo,
        getBasicProviderInfo
    };
}

module.exports = getLoginMethods;