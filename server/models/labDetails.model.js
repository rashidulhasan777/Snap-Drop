const mongoose = require("./../db");
const addressSchema = require('./address.model');

const labDetailsSchema = new mongoose.Schema({
  labName: {
    type: String,
  },
  labAddress: {
    type: addressSchema,
    required: true,
  },
  completedOrders: {
    type: String,
  }
});

module.exports = mongoose.model("LabDetails", labDetailsSchema);
