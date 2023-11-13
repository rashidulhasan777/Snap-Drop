const mongoose = require('../../db');
const detailsSchema = require('../details/details.model');

const labDetailsSchema = new mongoose.Schema({
  labName: {
    type: String,
  },
  labId: {
    type: Number,
    required: true
  },
  labDetails: {
    type: detailsSchema,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('LabDetails', labDetailsSchema);
