const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userController = require('./ControllerLayer/UserController');
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
app.use('/API', userController);
app.use(exceptionHandler);

module.exports = { app };