const router = require('express').Router();

const oauthController = require('../../controllers/oauth.controller');


router.post('/googleAccessCode', oauthController.googleAccessCode);
router.post('/fbAccessCode', oauthController.fbAccessCode);

module.exports = router;
