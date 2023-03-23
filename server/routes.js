const router = require('express').Router();

const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user.controller');
const orderController = require('./controllers/order.controller');
const oauthController = require('./controllers/oauth.controller');
const cartController = require('./controllers/cart.controller');
const labController = require('./controllers/lab.controller');
const pathaoController = require('./controllers/pathao.controller');

//User Routes
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/oauthLogin', oauthController.oauthLogin);
router.get(
  '/user',
  authMiddleware.authenticated,
  userController.getUserDetails
);
router.put('/user', authMiddleware.authenticated, userController.updateUser);

//Oauth Routes
router.post('/googleAccessCode', oauthController.googleAccessCode);
router.post('/fbAccessCode', oauthController.fbAccessCode);

// Order Routes
router.get(
  '/orderbyId/:id',
  authMiddleware.authenticated,
  orderController.getOrderById
);
router.get(
  '/order/:status',
  authMiddleware.lab,
  orderController.getOrdersbyStatus
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

//Cart Routes
router.put('/cart', authMiddleware.customer, cartController.updateUserCart);
router.get('/cart', authMiddleware.customer, cartController.getUserCart);
router.delete('/cart', authMiddleware.customer, cartController.clearCart);

//Pathao Routes
router.get('/pathao/accessToken', pathaoController.pathaoAccessToken);
router.post('/pathao/zones', pathaoController.pathaoZones);
router.post('/pathao/areas', pathaoController.pathaoAreas);
router.post('/pathao/price-calculation', pathaoController.patahaoPriceCalc);

//Internal Route for lab
router.post('/lab', labController.createLab);

module.exports = router;
