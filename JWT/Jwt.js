require('dotenv').config()
const jwt = require("jsonwebtoken");

const generateJwt = (userObject) => {
    return jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5min' });
}

const generateRefreshToken = (userObject) => {
    return jwt.sign(userObject, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}

const unEncriptRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
    generateJwt,
    generateRefreshToken,
    unEncriptRefreshToken
};