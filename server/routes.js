const router = require('express').Router();
const orderController = require('./controllers/order.controller');
const oauthController = require('./controllers/oauth.controller');

router.get('/order', orderController.getOrders);
router.post('/order', orderController.postOrder);

router.post('/googleAccessCode', oauthController.googleAccessCode);

module.exports = router;
