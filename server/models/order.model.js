const mongoose = require("./../db");
const imageSchema = require("./image.model")

const OrderSchema = mongoose.Schema({
  labId: {
    type: String, //!depends on redx
  },
  customerId: {
    type: String,
    required: true,
  },
  parcelId: {
    type: String
  },
  photoType: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  orderDate: {
    type: Date,
    default: Date.now()
  },
  instruction: {
    type: String,
  },
  pictures: {
    type: [imageSchema],
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
