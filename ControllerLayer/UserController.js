const { generateJwt } = require('../JWT/Jwt');

router = require('express').Router();
trycatch = require('../utils/tryCatch');
serviceInitializer = require('../ServiceLayer/UserService');

serviceInitializer().then((service) => {
    router.post('/employer/validate_login', trycatch(async (req, res, next) => {
        serviceResponse = await service.validateEmployerLogin(req.body);

        res.status(200).json({
            "accesToken" : generateJwt(serviceResponse)
        }).send();
    }));

    router.post('/provider/validate_login', trycatch(async (req, res, next) => {
        serviceResponse = await service.validateProviderLogin(req.body);

        res.status(200).json({
            "accesToken" : generateJwt(serviceResponse)
        }).send();
    }));

    router.post('/employer/register', trycatch(async (req, res, next) => {
        await service.registerEmployer(req.body);
        res.status(200).send();
    }));

    router.post('/provider/register', trycatch(async (req, res, next) => {
        await service.registerProvider(req.body);
        res.status(200).send();
    }));
});

module.exports = router;