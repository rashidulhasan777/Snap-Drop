const mongoose = require('./../db');

const OrderSchema = mongoose.Schema({
    labId: {
      type: String,
      required: true
    },
    customerId: {
      type: String,
      required: true
    },
    orderStatus: {
      type: String
    },
    instruction: {
      type: String
    },
    pictures: {
        type: [String]
    }
})

module.exports = mongoose.model('Order', OrderSchema);