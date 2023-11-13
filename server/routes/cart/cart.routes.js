const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');
const cartController = require('../../controllers/cart.controller');


router.put('/cart', authMiddleware.customer, cartController.updateUserCart);
router.get('/cart', authMiddleware.customer, cartController.getUserCart);
router.delete('/cart', authMiddleware.customer, cartController.clearCart);

module.exports = router;
