const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const registerController = require('./ControllerLayer/RegisterController');
const exceptionHandler = require('./Middlewares/ExceptionHandler');

const app = express();

app.use(morgan('dev'));
app.use(cors(
    {
        origin: '*'
    }
));

app.use(express.json());
app.use('/API/Register', registerController);
app.use(exceptionHandler);

module.exports = { app };