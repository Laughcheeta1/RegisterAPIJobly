const getRegisterMethods = (db) =>
{
    const emailInUse = async (email) => {
        return await db.collection('Employer').countDocuments({ "email" : { "$eq" : email } }) > 0 || await db.collection('Provider').countDocuments({ "email" : { "$eq" : email } }) > 0;
    }

    const phoneNumerInUse = async (phoneNumber) => {
        return await db.collection('Employer').countDocuments({ "phoneNumber" : { "$eq" : phoneNumber } }) > 0 || await db.collection('Provider').countDocuments({ "phoneNumber" : { "$eq" : phoneNumber } }) > 0;
    }

    const registerEmployer = async (registerInfo) => {
        // TODO: Convert this into a single transaction, to avoid autoincrement without insertion
        dbId = (await db.collection('AutoIncrementCounter').findOneAndUpdate(
                    { 'collection': 'Employer' }, 
                    { $inc: { counter: 1 } }, 
                    { returnDocument: 'after' }))  // Return the updated document
                    .counter;  // From the json return value, just get the counter

        registerInfo.dbId = dbId;
        await db.collection('Employer').insertOne(registerInfo);
    }

    const registerProvider = async (registerInfo) => {
        // TODO: convert this into a single transaction
        dbId = (await db.collection('AutoIncrementCounter').findOneAndUpdate(
                    { 'collection': 'Provider' }, 
                    { $inc: { counter: 1 } }, 
                    { returnDocument: 'after' }))  // Return the updated document
                    .counter;  // From the json return value, just get the counter

        registerInfo.dbId = dbId;
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