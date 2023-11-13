const User = require('../models/user/user.model');
const { createUser, loginUser, updateUserDetails } = require('../models/user/user.query');

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user)
    return res.status(409).send({ errorMessage: 'User already exists' });
  try {
    const access_token = await createUser(req.body)
    res.status(201).send({ access_token });
  } catch (error) {
    res.status(400).send({ errorMessage: 'Could not create user' });
  }
};

const login = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send({ errorMessage: 'You are not yet registered' });;
  }
  try { 
    const access_token = await loginUser(req.body);
    res.status(201).send({ access_token });
  } catch (error) {
    console.log(error);
    res.status(401).send({ errorMessage: 'Password is incorrect' });
  }
};

const getUserDetails = (req, res) => {
  res.status(200).send(req.currentUser);
};
const updateUser = async (req, res) => {
  try {
    const user = await updateUserDetails(req.body, req.currentUser._id);
    req.createUser = user;
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const setNewUser = async (req, res) => {
  try {
    req.currentUser.newUser = false;
    await req.currentUser.save();
    res.status(201).send({message:"Updated!"});
  } catch (error) {
    console.log(error);
  }
};

const getUserRole = async (req, res) => {
  res.status(200).send({ role: req.currentUser.typeOfUser });
};
module.exports = {
  register,
  login,
  getUserDetails,
  updateUser,
  getUserRole,
  setNewUser,
};
