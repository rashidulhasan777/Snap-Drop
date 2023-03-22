const mongoose = require('./../db');
const detailsSchema = require('./details.model');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
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
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
