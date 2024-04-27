// The errors
repositoryInitializer = require('../DatabaseLayer/RegisterRepository');

const logInLogic = require('./LogInLogic');
const registerLogic = require('./RegisterLogic');
const tokenLogic = require('./TokenLogic');

const initializer = async () => {
    const repository = await repositoryInitializer();

    return {
        ...logInLogic(repository),
        ...registerLogic(repository),
        ...tokenLogic(repository)
    }
};

module.exports = initializer;