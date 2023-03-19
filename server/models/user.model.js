const mongoose = require('./../db');

const userSchema = mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    recentOrderStatus: {
      type: String
    },
    typeOfUser: {
      type: String,
      required: true
    },
    profilePic: {
        type: String
    },
    address: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);

