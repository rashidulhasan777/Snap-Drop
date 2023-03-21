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
});

module.exports = { imageSchema };
