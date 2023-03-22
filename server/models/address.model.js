const mongoose = require("./../db");

const addressSchema = new mongoose.Schema({
  houseNo: {
    type: String
  },
  roadNo: {
    type: String,
  },
  area: {
    type: String,
  },
  postCode: {
    type: String,
  },
  district: {
    type: String,
  }
});

module.exports = {addressSchema}