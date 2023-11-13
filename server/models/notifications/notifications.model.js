const mongoose = require('../../db');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  subscriptionObject: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
