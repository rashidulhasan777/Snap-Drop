const router = require('express').Router();

const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user.controller');
const orderController = require('./controllers/order.controller');
const oauthController = require('./controllers/oauth.controller');
const labController = require('./controllers/lab.controller');
const pathaoController = require('./controllers/pathao.controller');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/oauthLogin', oauthController.oauthLogin);
router.get(
  '/user',
  authMiddleware.authenticated,
  userController.getUserDetails
);

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
  '/orderbyStatusAndLabid/',
  authMiddleware.customer,
  orderController.getOrderByStatus
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

router.post('/lab', labController.createLab)
router.get('/pathao/accessToken', pathaoController.pathaoAccessToken);
router.post('/pathao/zones', pathaoController.pathaoZones);
router.post('/pathao/areas', pathaoController.pathaoAreas);

module.exports = router;
