const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

(async function () {
    try {
      await mongoose.connect(process.env.DB_URL);
        console.log(`Database connected @ port ${process.env.PORT || 3000}!`);
    } catch (error) {
      console.log(`Something went wrong in Database! ${err}`);
    }
  })();

  module.exports = mongoose;