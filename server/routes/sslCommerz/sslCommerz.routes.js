const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');
const SslCommerzController = require('../../controllers/sslcommerz.controller');


router.get(
    '/payment/:order_id/:amount',
    authMiddleware.customer,
    SslCommerzController.initPayment
  );
  router.post('/payment-success', SslCommerzController.success);
  router.post('/payment-failure', SslCommerzController.failure);
  router.post('/payment-cancel', SslCommerzController.cancel);
  router.post('/payment-ipn', SslCommerzController.ipn);

module.exports = router;
