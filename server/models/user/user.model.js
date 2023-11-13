const mongoose = require('../../db');
const detailsSchema = require('../details/details.model');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  newUser: {
    type: Boolean,
    required: true,
    default: true,
  },
  typeOfUser: {
    type: String,
    required: true,
    default: 'customer',
  },
  profilePic: {
    type: String,
  },
  details: {
    type: detailsSchema,
  },
  labId: {
    type: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
