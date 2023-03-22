const mongoose = require("./../db");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true, //!required for lab
  },
  contact_name: {
    type: String,
    // required: true, //!required for lab
  },
  contact_number: {
    type: String,
    // required: true, //!required for lab
  },
  secondary_contact: {
    type: String, //!used for lab
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

module.exports = addressSchema;
