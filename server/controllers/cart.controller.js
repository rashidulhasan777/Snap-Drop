const Carts = require('../models/cart.model');

const getUserCart = async (req, res, next) => {
  try {
    const userCart = await Carts.find({ userId: req.currentUser._id });
    res.status(200).send(userCart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};
const updateUserCart = async (req, res, next) => {
  try {
    const userCart = await Carts.findAndUpdate(
      { userId: req.currentUser._id },
      req.body,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).send(userCart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

module.exports = {
  getUserCart,
  updateUserCart,
};
