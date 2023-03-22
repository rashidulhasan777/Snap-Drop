const mongoose = require('./../db');
const { addressSchema } = require('./address.model');
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
