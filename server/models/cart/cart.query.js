const Carts = require('./cart.model');

const updateCartsToDb = async (currentUser,data) => {
    try {
        const userCart = await Carts.findOneAndUpdate(
          { userId: currentUser._id },
          data,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        return userCart;
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
    updateCartsToDb
}