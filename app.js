const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const registerController = require('./ControllerLayer/RegisterController');
const exceptionHandler = require('./Middlewares/ExceptionHandler');

const apiGatewayURI = "";

const app = express();

app.use(morgan('dev'));
app.use(cors(
    {
        origin: apiGatewayURI,
        credentials: true
    }
));

app.use(express.json());
app.use('/API', registerController);
app.use(exceptionHandler);

module.exports = { app };