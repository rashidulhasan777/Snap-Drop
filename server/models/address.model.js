const mongoose = require("./../db");

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  city_id: {
    type: Number,
  },
  zone_id: {
    type: Number,
  },
  area_id: {
    type: Number,
  },
});

module.exports = { addressSchema };
