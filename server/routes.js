const router = require('express').Router();

const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user.controller');
const orderController = require('./controllers/order.controller');
const oauthController = require('./controllers/oauth.controller');
const cartController = require('./controllers/cart.controller');
const labController = require('./controllers/lab.controller');
const pathaoController = require('./controllers/pathao.controller');
const SslCommerzController = require('./controllers/sslcommerz.controller');
const cloudinaryController = require('./controllers/cloudinary.controller');

//User Routes
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/oauthLogin', oauthController.oauthLogin);
router.get(
  '/user',
  authMiddleware.authenticated,
  userController.getUserDetails
);
router.get(
  '/userType',
  authMiddleware.authenticated,
  userController.getUserRole
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
  '/order/latestOrder',
  authMiddleware.customer,
  orderController.getUserLastOrder
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
//These two routes needs to be before /order/:id to match
router.put(
  '/order/paid',
  authMiddleware.customer,
  orderController.setOrderPaid
);
router.delete(
  '/order/unpaid',
  authMiddleware.customer,
  orderController.cleanUnpaidOrders
);
router.get(
  '/order/:status',
  authMiddleware.lab,
  orderController.getOrdersbyStatus
);
//Keep these under /order/paid
router.post('/order', authMiddleware.customer, orderController.createOrder);
router.put('/order/:id', authMiddleware.lab, orderController.changeOrderStatus);
router.put(
  '/orderUpdate/:id',
  authMiddleware.lab,
  orderController.updatePassport
);

//Cart Routes
router.put('/cart', authMiddleware.customer, cartController.updateUserCart);
router.get('/cart', authMiddleware.customer, cartController.getUserCart);
router.delete('/cart', authMiddleware.customer, cartController.clearCart);

//Pathao Routes
router.get('/pathao/accessToken', pathaoController.pathaoAccessToken);
router.post('/pathao/zones', pathaoController.pathaoZones);
router.post('/pathao/areas', pathaoController.pathaoAreas);
router.post('/pathao/order', pathaoController.createOrder);

//SSLcommerz Routes
router.get('/payment/:order_id/:amount', SslCommerzController.initPayment);
router.post('/payment-success', SslCommerzController.success);
router.post('/payment-failure', SslCommerzController.failure);
router.post('/payment-cancel', SslCommerzController.cancel);
router.post('/payment-ipn', SslCommerzController.ipn);
// router.get('/validate', SslCommerzController.validate);
router.get(
  '/pathao/closest-studio',
  authMiddleware.customer,
  pathaoController.pathaoFindClosestStudio
);
router.post(
  '/pathao/price-calculation',
  authMiddleware.customer,
  pathaoController.patahaoPriceCalc
);

//Cloudinary Routes
router.post('/download_photos', cloudinaryController.downloadOrderPhotos);

//Internal Route for lab
router.post('/lab', labController.createLab);

module.exports = router;
