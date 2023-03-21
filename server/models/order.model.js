const mongoose = require('./../db');
const { addressSchema } = require('./address.model');
const imageSchema = require('./image.model');

const OrderSchema = mongoose.Schema(
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
    photoType: {
      type: String,
    },
    customerAddress: {
      type: addressSchema,
    },
    orderStatus: {
      type: String,
      // enum: ['pending', 'approved', 'picked up for deliveryy']
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
    orderType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
