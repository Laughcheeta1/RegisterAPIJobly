const { db } = require('../db');


const logLogin = async (dbId) => {
    db.collection('logins').insertOne({ user: dbId, session_start: new Date() });
}

const getBasicEmployerInfo = (email) => {
    return db.collection('Employer').findOne({ email }, { projection: { _id: 1, username: 1, password: 1 } });
}

const getBasicProviderInfo = (email) => {
    return db.collection('Provider').findOne({ email }, { projection: { _id: 1, username: 1, password: 1 } });
}

const emailInUse = (email) => {
    return db.collection('Employer').countDocuments({ email }) > 0 || db.collection('Provider').countDocuments({ email }) > 0;
}

const registerEmployer = (registerInfo) => {
    db.collection('Employer').insertOne(registerInfo);
}

const registerProvider = (registerInfo) => {
    db.collection('Provider').insertOne(registerInfo);
}


module.exports = {
    logLogin,
    getBasicEmployerInfo,
    getBasicProviderInfo,
    emailInUse,
    registerEmployer,
    registerProvider
};