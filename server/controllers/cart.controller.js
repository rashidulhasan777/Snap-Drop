const Carts = require('../models/cart/cart.model');
const { updateCartsToDb,clearCartFromDb,getUserCartFromDb } = require('../models/cart/cart.query');

const getUserCart = async (req, res, next) => { 
  try {
    const userCart = await getUserCartFromDb(req.currentUser._id)
    res.status(200).send(userCart);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};
const updateUserCart = async (req, res, next) => {
  try {
    const userCart = await updateCartsToDb(req.currentUser,req.body)
    res.status(201).send(userCart);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const clearCart = async (req, res, next) => {
  try {
    const isDeleted = await clearCartFromDb(req.currentUser._id)
    if(isDeleted){
      res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

module.exports = {
  getUserCart,
  updateUserCart,
  clearCart,
};
