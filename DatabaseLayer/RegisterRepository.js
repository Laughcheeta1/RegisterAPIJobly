const connectDb = require('../db.js');

const logInMethods = require('./LogInMethods.js');
const tokenMethods = require('./TokenMethods.js');
const registerMethods = require('./RegisterMethods.js');

const initialize = async () => {
    db = await connectDb();

    return {
        ...logInMethods(db),
        ...tokenMethods(db),
        ...registerMethods(db)
    };
};


module.exports = initialize