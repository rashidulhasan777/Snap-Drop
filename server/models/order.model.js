const mongoose = require('./../db');
const imageSchema = require('./image.model');

const OrderSchema = new mongoose.Schema(
  {
    labId: {
      type: String, //!depends on redx
    },
    customerId: {
      type: String,
      required: true,
    },
    parcelId: {
      type: String,
    },
    orderStatus: {
      type: String,
      default: 'pending',
    },
    instruction: {
      type: String,
    },
    passportPictures: {
      type: [imageSchema],
    },
    galleryPictures: {
      type: [imageSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
