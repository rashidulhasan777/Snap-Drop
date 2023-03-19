const mongoose = require("./../db");
const addressSchema = require("./address.model")

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
  },
  profilePic: {
    type: String,
  },
  address: {
    type: [addressSchema],
  },
});

module.exports = mongoose.model("User", userSchema);
