const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const registerController = require('./ControllerLayer/RegisterController');
const exceptionHandler = require('./Middlewares/ExceptionHandler');
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your client's origin
    credentials: true
}));

app.use(express.json());
app.use('/API/Register', registerController);
app.use(exceptionHandler);

module.exports = { app };