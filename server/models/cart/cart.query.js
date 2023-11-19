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
const getUserCartFromDb = async (id)=>{
try {
  const userCart = await Carts.findOne({ userId: id });
  return userCart;
} catch (error) {
  console.log(error); }
}
const clearCartFromDb = async (id)=>{
  try {
    await Carts.findOneAndDelete({
      userId: req.currentUser._id,
    });
    return true
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  updateCartsToDb,
  getUserCartFromDb,
  clearCartFromDb
}