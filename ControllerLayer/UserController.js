router = require('express').Router();
service = require('../ServiceLayer/UserService');


router.post('/employer/validate_login', (req, res) => {
    serviceResponse = service.validateEmployerLogin(req.body);

    if (serviceResponse.valid)
        res.status(200).body(serviceResponse.Employer).send();
    else
        res.status(401).send();
});

router.post('/provider/validate_login', (req, res) => {
    serviceResponse = service.validateProviderLogin(req.body);

    if (serviceResponse.valid)
        res.status(200).body(serviceResponse.Provider).send();
    else
        res.status(401).send();
});

router.post('/employer/register', (req, res) => {
    service.registerEmployer(req.body);
    res.status(200).send();
});

router.post('/provider/register', (req, res) => {
    service.registerProvider(req.body);
    res.status(200).send();
});

module.exports = router;