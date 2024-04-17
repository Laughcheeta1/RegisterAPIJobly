const { generateJwt, generateRefreshToken } = require('../JWT/Jwt');

router = require('express').Router();
trycatch = require('../utils/tryCatch');
serviceInitializer = require('../ServiceLayer/RegisterService');

serviceInitializer().then((service) => {

    router.post('/newToken', async (req, res, next) => {
        const refreshToken = req.body.token;
        
    });

    router.post('/employer/validate_login', async (req, res, next) => {
        res.status(200).json(await service.validateEmployerLogin(req.body)).send();
    });

    router.post('/provider/validate_login', async (req, res, next) => {
        res.status(200).json(await service.validateProviderLogin(req.body)).send();
    });

    router.post('/employer/register', async (req, res, next) => {
        await service.registerEmployer(req.body);
        res.status(200).send();
    });

    router.post('/provider/register', async (req, res, next) => {
        await service.registerProvider(req.body);
        res.status(200).send();
    });

});

module.exports = router;