const router = require('express').Router();


const authMiddleware = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');
const oauthController = require('../../controllers/oauth.controller');



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
router.put('/newUserFalse', authMiddleware.customer, userController.setNewUser);

module.exports = router;
