const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const createUser = async (data) => {
  const { username, password } = data;
  try {
    console.log(username, password);
    if (password === '') throw new Error("password can't be empty");
    const hash = await bcrypt.hash(password, 10);
    const user = { ...data, password: hash };
    const newUser = await User.create(user);
    const { _id } = newUser._id;
    const access_token = jwt.sign({ _id }, SECRET_KEY);
    return access_token;
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (data) => {
  const { email, password } = data;
  try {
    const user = await User.findOne({ email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error('Password is incorrect');
    const access_token = jwt.sign({ _id: user._id }, SECRET_KEY);
    return access_token;
  } catch (error) {
    console.log(error);
  }
};
const updateUserDetails = async (data, id) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        $set: { details: { ...data } },
      },
      { new: true }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUserDetails,
};
