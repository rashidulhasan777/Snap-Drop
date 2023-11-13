const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');
const pathaoController = require('../../controllers/pathao.controller');


router.get('/pathao/accessToken', pathaoController.pathaoAccessToken);
router.post('/pathao/zones', pathaoController.pathaoZones);
router.post('/pathao/areas', pathaoController.pathaoAreas);
router.post('/pathao/order', authMiddleware.lab, pathaoController.createOrder);
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

module.exports = router;
