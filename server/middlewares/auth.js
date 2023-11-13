const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const SECRET_KEY = process.env.JWT_SECRET;

const checkAuthentication = async (req, res) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    return;
  }
  const token = authHeaders.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id });
    if (!user) {
      return;
    }
    req.currentUser = user;
  } catch (error) {
    console.log(error);
    return;
  }
};

const authenticated = async (req, res, next) => {
  try {
    await checkAuthentication(req, res, next);
    if (req.currentUser) next();
    else res.status(401).send({ errorMessage: 'Unauthorized Request' });
  } catch (error) {
    console.log(error);
    res.status(401).send({ errorMessage: 'Unauthorized Request' });
  }
};

const customer = async (req, res, next) => {
  try {
    await checkAuthentication(req, res);
    if (!req.currentUser || req.currentUser.typeOfUser !== 'customer') {
      console.log(req.currentUser);
      res.status(401).send({ errorMessage: 'Unauthorized Request' });
    } else next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};
const lab = async (req, res, next) => {
  try {
    await checkAuthentication(req, res);
    // console.log(req.currentUser.labId);

    if (!req.currentUser || req.currentUser.typeOfUser !== 'lab')
      res.status(401).send({ errorMessage: 'Unauthorized Request' });
    else next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

module.exports = { customer, lab, authenticated };
