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
    const user = {...req.body, password: hash};
    const newUser = await User.create(user);
    const { _id } = newUser._id;
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken });
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
      return;
    }
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(401).send({ errorMessage: 'Password is incorrect' });
  }
};

const getUserDetails =  (req, res) => {
  res.status(200).send(req.currentUser);
};

module.exports = { register, login, getUserDetails };
