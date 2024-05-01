const { generateJwt, generateRefreshToken } = require('../JWT/Jwt');

router = require('express').Router();

// Turns out that the tryCatch function is needed since express does not automatically handle exceptions (Throwing it to the 
// next middleware) inside async functions, so we need to catch the exception and send it to the next middleware. Thats why we
// need to use the tryCatch function in the controller functions
trycatch = require('../utils/tryCatch');

serviceInitializer = require('../ServiceLayer/RegisterService');

serviceInitializer().then((service) => {

    router.post('/newToken', trycatch(async (req, res, next) => {
        // Get the refresh token from the cookies
        // TODO: Check if the cookie does have the name R_Token or not
        res.status(200).json(await service.generateNewToken(req.cookies.R_Token)).send();
    }));

    // TODO: Add Admin login but not register (register manually in db)

    router.post('/employer/validate_login', trycatch(async (req, res, next) => {
        await service.validateEmployerLogin(req.body, res);
        res.status(200).send();  // The validateEmployerLogin function will set the response body and cookies
    }));

    router.post('/provider/validate_login', trycatch(async (req, res, next) => {
        await service.validateProviderLogin(req.body, res);
        res.status(200).send();  // The validateEmployerLogin function will set the response body and cookies
    }));


    // TODO: Add password encription
    router.post('/employer/register', trycatch(async (req, res, next) => {
        await service.registerEmployer(req.body);
        res.status(201).send();
    }));

    router.post('/provider/register', trycatch(async (req, res, next) => {
        await service.registerProvider(req.body);
        res.status(201).send();
    }));
});

module.exports = router;