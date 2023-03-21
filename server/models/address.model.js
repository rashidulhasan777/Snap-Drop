const mongoose = require("./../db");

const addressSchema = mongoose.Schema({
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
  District: {
    type: String,
  }
});

module.exports = {addressSchema}