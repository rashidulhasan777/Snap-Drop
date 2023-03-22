const mongoose = require("./../db");

const labAddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  secondary_contact: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city_id: {
    type: Number,
    required: true,
  },
  zone_id: {
    type: Number,
    required: true,
  },
  area_id: {
    type: Number,
    required: true,
  },
});

const labDetailsSchema = new mongoose.Schema({
  labId: {
    type: String,
  },
  labName: {
    type: String,
  },
  labAddress: {
    type: labAddressSchema,
    required: true,
  },
  completedOrders: {
    type: String,
  }
});

module.exports = mongoose.model("LabDetails", labDetailsSchema);
