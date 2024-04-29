const { generateJwt, generateRefreshToken } = require('../JWT/Jwt');

router = require('express').Router();

// Turns out that the tryCatch function is needed since express does not automatically handle exceptions (Throwing it to the 
// next middleware) inside async functions, so we need to catch the exception and send it to the next middleware. Thats why we
// need to use the tryCatch function in the controller functions
trycatch = require('../utils/tryCatch');

serviceInitializer = require('../ServiceLayer/RegisterService');

serviceInitializer().then((service) => {

    router.post('/newToken', trycatch(async (req, res, next) => {
        const refreshToken = req.body.token;
        res.status(200).json(await service.generateNewToken(refreshToken)).send();
    }));

    // TODO: Add Admin login but not register (register manually in db)

    // TODO: send the token in cookies
    router.post('/employer/validate_login', trycatch(async (req, res, next) => {
        res.status(200).json(await service.validateEmployerLogin(req.body)).send();
    }));

    router.post('/provider/validate_login', trycatch(async (req, res, next) => {
        res.status(200).json(await service.validateProviderLogin(req.body)).send();
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