const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');
const orderController = require('../../controllers/order.controller');

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
  router.get(
    '/orderOneWeek/',
    authMiddleware.lab,
    orderController.getOneWeekData
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
  router.post(
    '/generateOrderId',
    authMiddleware.customer,
    orderController.generateOrderId
  );
  
  //Keep these under /order/paid
  router.post('/order', authMiddleware.customer, orderController.createOrder);
  router.put('/order/:id', authMiddleware.lab, orderController.changeOrderStatus);
  router.put(
    '/orderUpdate/:id',
    authMiddleware.authenticated,
    orderController.updatePassport
  );

  module.exports = router;
