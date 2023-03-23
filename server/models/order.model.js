const mongoose = require('./../db');
const detailsSchema = require('./details.model');
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
    orderDelivaryDetails: {
      type: detailsSchema,
      required: true,
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
