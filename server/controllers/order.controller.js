const Order = require("./../models/order.model");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postOrder = async (req, res) => {
  if (req.body.customerId && req.body.labId) {
    try {
      const result = await Order.create(req.body);
      res.status(201);
      res.send(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).send("Insufficient data");
  }
};

module.exports = { getOrders, postOrder }
