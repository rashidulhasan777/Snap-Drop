const mongoose = require('../../db');
const detailsSchema = require('../details/details.model');
const imageSchema = require('../image/image.model');

const priceSchema = new mongoose.Schema({
  passport: { type: Number, required: true },
  gallery: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    labId: {
      type: Number,
      required: true,
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
    totalPrice: {
      type: priceSchema,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
    instruction: {
      type: String,
    },
    passportPictures: {
      type: [imageSchema],
    },
    countryForPassport: {
      type: String,
    },
    galleryPictures: {
      type: [imageSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
