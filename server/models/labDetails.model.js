const mongoose = require("./../db");

const labDetailsSchema = mongoose.Schema({
  labId: {
    type: String
  },
  areaId: {
    type: String
  },
  labName: {
    type: String
  },
  labAddress: {
    type: String,
    required: true,
  },
  orderCountHistory: {
    type: [Number],
  },
  completedOrders: {
    type: String,
  },
  orderList: {
    type: [String],
  },
  averageCompletionTime: {
    type: Number,
  },
});

module.exports = mongoose.model("LabDetails", labDetailsSchema);
