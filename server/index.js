if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');

const app = express();

(async function () {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server started on ' + (process.env.PORT || 3000));
    });
  } catch (error) {
    console.log(error);
  }
})();
