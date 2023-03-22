const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const SECRET_KEY = process.env.JWT_SECRET;

const checkAuthentication = async (req, res) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders)
    return res.status(401).send({ errorMessage: 'You are not authorized' });
  const token = authHeaders.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id });
    console.log('here');
    if (!user)
      return res.status(401).send({ errorMessage: 'You are not authorized' });
    req.currentUser = user;
    return;
  } catch (error) {
    res.status(401).send({ errorMessage: 'You are not authorized' });
  }
};

const authenticated = async (req, res, next) => {
  try {
    await checkAuthentication(req, res);
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
    if (req.currentUser.typeOfUser !== 'customer')
      res.status(401).send({ errorMessage: 'Unauthorized Request' });
    else next();
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};
const lab = async (req, res, next) => {
  try {
    await checkAuthentication(req, res);
    if (req.currentUser.typeOfUser !== 'lab')
      res.status(401).send({ errorMessage: 'Unauthorized Request' });
    else next();
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

module.exports = { customer, lab, authenticated };
