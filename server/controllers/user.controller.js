const User = require('./../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user)
    return res.status(409).send({ errorMessage: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const user = { ...req.body, password: hash };
    const newUser = await User.create(user);
    const { _id } = newUser._id;
    const access_token = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ access_token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errorMessage: 'Could not create user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send({ errorMessage: 'You are not yet registered' });
      console.log(user);
      return;
    }
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error('Password is incorrect');
    const access_token = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ access_token });
  } catch (error) {
    console.log(error);
    res.status(401).send({ errorMessage: 'Password is incorrect' });
  }
};

const getUserDetails = (req, res) => {
  res.status(200).send(req.currentUser);
};
const updateUser = async (req, res) => {
  // console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate(
      req.currentUser._id,
      {
        $set: { details: { ...req.body } },
      },
      { new: true }
    );
    req.currentUser = user;
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const getUserRole = async (req, res, next) => {
  res.status(200).send({ role: req.currentUser.typeOfUser });
};
module.exports = { register, login, getUserDetails, updateUser, getUserRole };
