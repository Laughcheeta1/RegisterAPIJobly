const getRegisterMethods = (db) =>
{
    const emailInUse = async (email) => {
        return await db.collection('Employer').countDocuments({ "email" : { "$eq" : email } }) > 0 || await db.collection('Provider').countDocuments({ "email" : { "$eq" : email } }) > 0;
    }

    const phoneNumerInUse = async (phoneNumber) => {
        return await db.collection('Employer').countDocuments({ "phoneNumber" : { "$eq" : phoneNumber } }) > 0 || await db.collection('Provider').countDocuments({ "phoneNumber" : { "$eq" : phoneNumber } }) > 0;
    }

    const registerEmployer = async (registerInfo) => {
        await db.collection('Employer').insertOne(registerInfo);
    }

    const registerProvider = async (registerInfo) => {
        await db.collection('Provider').insertOne(registerInfo);
    }

    return {
        emailInUse,
        phoneNumerInUse,
        registerEmployer,
        registerProvider
    };
}

module.exports = getRegisterMethods;