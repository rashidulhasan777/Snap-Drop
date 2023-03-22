const mongoose = require('./../db');

const imageSchema = mongoose.Schema({
  photoSize: {
    type: String,
  },
  orgFilename: {
    type: String,
  },
  apiFilename: {
    type: String,
  },
  copies: {
    type: Number,
  },
  imageURL: {
    type: String,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  typeOfImage: {
    type: String,
    required: true,
    enum: ['passport', 'gallery'],
  },
});

module.exports = imageSchema;
