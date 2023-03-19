const router = require("express").Router();
const authMiddleware = require('./middlewares/auth');
const orderController = require("./controllers/order.controller");
const userController = require("./controllers/user.controller");


router.post("/login", userController.login);
router.post("/register", userController.register);

// router.get("/order", orderController.getAllOrders);
router.get("/orderbyId/:id", authMiddleware.authenticated, orderController.getOrderById);
router.get("/orderbyCustomer/", authMiddleware.customer, orderController.getOrderByCustomerId);
router.get("/orderforLab/",authMiddleware.lab, orderController.getOrderByLabId);
router.post("/order", authMiddleware.customer, orderController.createOrder);
router.put("/order/:id", authMiddleware.lab, orderController.changeOrderStatus);

module.exports = router;