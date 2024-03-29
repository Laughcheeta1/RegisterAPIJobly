require('dotenv').config()
const jwt = require("jsonwebtoken");

const generateJwt = (userObject) => {
    // TODO: add expiration logic to the JWT
    // TODO: make the private key come from the environment variables of the pc, not the server
    const accesToken = jwt.sign(userObject, process.env.ACCES_TOKEN_SECRET);
    return accesToken;
}

module.exports = {
    generateJwt
};