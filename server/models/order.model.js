const mongoose = require("./../db");
const imageSchema = require("./image.model")

const OrderSchema = mongoose.Schema({
  labId: {
    type: String,
    // required: true,
  },
  customerId: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Order", OrderSchema);
