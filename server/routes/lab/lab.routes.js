const router = require('express').Router();

const countries = require('../../utils/data/requirementsFromLab.json');
const authMiddleware = require('../../middlewares/auth');
const orderController = require('../../controllers/order.controller');
const labController = require('../../controllers/lab.controller');
const sendMessageController = require('../../controllers/sendMessageController');
const { uploadToOrder } = require('../../controllers/cutoutpro.controller');
const { setASubscriber } = require('../../controllers/notifications.controller');

router.post('/lab', labController.createLab);

router.get('/dowloadOrder/:id', authMiddleware.lab, uploadToOrder);
router.get('/countries', (req, res) => {
  const countryNames = countries.map((el) => el.country);
  res.status(200).send(countryNames);
});

router.post(
  '/subscribeToNotification',
  authMiddleware.authenticated,
  setASubscriber
);

router.post('/sendMessage', sendMessageController);

router.post('/getLabName', labController.getLabName);

router.get(
  '/orderCountByProductCategory',
  authMiddleware.lab,
  orderController.getOrderCountByProductCategory
);

module.exports = router;
