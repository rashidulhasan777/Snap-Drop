const router = require("express").Router();
const orderController = require("./controllers/order.controller");

router.get("/order", orderController.getOrders);
router.post("/order", orderController.postOrder);

module.exports = router;