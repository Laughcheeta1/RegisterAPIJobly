require('dotenv').config()
const jwt = require("jsonwebtoken");

const generateJwt = (userObject) => {
    return jwt.sign(userObject, process.env.ACCES_TOKEN_SECRET, { expiresIn: '10min' });
}

const generateRefreshToken = (userObject) => {
    return jwt.sign(userObject, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
    generateJwt,
    generateRefreshToken
};