const mongoose = require('./../db');

const userSchema = mongoose.Schema({
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
  recentOrderStatus: {
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
  address: {
    type: String,
  },
  labId: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
