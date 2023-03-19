const mongoose = require("mongoose");

(async function () {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected`);
  } catch (error) {
    console.log(`Something went wrong in Database! ${err}`);
  }
})();

module.exports = mongoose;
