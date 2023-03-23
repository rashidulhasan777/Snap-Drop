const mongoose = require("../db");

const citySchema = new mongoose.Schema({
  city_id: { type: Number, required: true },
  city_name: { type: String, required: true },
});
const zoneSchema = new mongoose.Schema({
  zone_id: { type: Number, required: true },
  zone_name: { type: String, required: true },
});
const areaSchema = new mongoose.Schema({
  area_id: { type: Number, required: true },
  area_name: { type: String, required: true },
});

const detailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_name: {
    type: String,
    // required: true, //!required for lab
  },
  contact_number: {
    type: String,
    required: true,
  },
  secondary_contact: {
    type: String, //!used for lab
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: citySchema,
    required: true,
  },
  zone: {
    type: zoneSchema,
    required: true,
  },
  area: {
    type: areaSchema,
    required: true,
  },
});

module.exports = detailsSchema;
