const mongoose = require('./../db');
const detailsSchema = require('./details.model');

const labDetailsSchema = new mongoose.Schema({
  labName: {
    type: String,
  },
  labDetails: {
    type: detailsSchema,
    required: true,
  },
});

module.exports = mongoose.model('LabDetails', labDetailsSchema);
