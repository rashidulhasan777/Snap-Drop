const mongoose = require('mongoose');
const imageSchema = require('./image.model');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  passportPictures: {
    type: [imageSchema],
    required: true,
    default: [],
  },
  galleryPictures: {
    type: [imageSchema],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model('Cart', cartSchema);
