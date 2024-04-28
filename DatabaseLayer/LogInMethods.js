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
        basicInfo = await db.collection('Employer').findOne({ "email" : { "$eq" : email } }, { projection: { _id: 1, name: 1, password: 1 } });
        if (!basicInfo) return null; // If the email is not found, return null
        basicInfo.dbId = basicInfo._id;
        delete basicInfo._id; // When create the dbId, we can delete all this.
        return basicInfo; // It is just temporal
    };

    const getBasicProviderInfoByEmail = async (email) => {
        basicInfo = await db.collection('Provider').findOne({ "email" : { "$eq" : email } }, { projection: { dbId: 1, name: 1, password: 1 } })
        if (!basicInfo) return null; // If the email is not found, return null
        basicInfo.dbId = basicInfo._id;
        delete basicInfo._id;
        return basicInfo;
    };

    const getBasicEmployerInfoByDbId = async (dbId) => {
        console.log("Recieved dbId: " + dbId);
        
        basicInfo = await db.collection('Employer').findOne({ "_id" : { "$eq" : new ObjectId(dbId) } }, { projection: { _id: 1, name: 1, password: 1 } });
        
        console.log("BasicInfo: ");
        console.log(basicInfo);

        if (!basicInfo) return null; // If the dbId is not found, return null
        basicInfo.dbId = basicInfo._id;
        delete basicInfo._id; // When create the dbId, we can delete all this.
        return basicInfo; // It is just temporal
    };

    const getBasicProviderInfoByDbId = async (dbId) => {
        basicInfo = await db.collection('Provider').findOne({ "_id" : { "$eq" : new ObjectId(dbId) } }, { projection: { dbId: 1, name: 1, password: 1 } })
        if (!basicInfo) return null; // If the dbId is not found, return null
        basicInfo.dbId = basicInfo._id;
        delete basicInfo._id;
        return basicInfo;
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