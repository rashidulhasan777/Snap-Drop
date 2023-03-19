const router = require('express').Router();

const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user.controller');
const orderController = require('./controllers/order.controller');
const oauthController = require('./controllers/oauth.controller');

router.post('/login', userController.login);
router.post('/register', userController.register);

// router.get("/order", orderController.getAllOrders);
router.get(
  '/orderbyId/:id',
  authMiddleware.authenticated,
  orderController.getOrderById
);
router.get(
  '/orderbyCustomer/',
  authMiddleware.customer,
  orderController.getOrderByCustomerId
);
router.get(
  '/orderforLab/',
  authMiddleware.lab,
  orderController.getOrderByLabId
);
router.post('/order', authMiddleware.customer, orderController.createOrder);
router.put('/order/:id', authMiddleware.lab, orderController.changeOrderStatus);

router.post('/googleAccessCode', oauthController.googleAccessCode);
router.post('/fbAccessCode', oauthController.fbAccessCode);

module.exports = router;
