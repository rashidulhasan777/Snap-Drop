const Order = require("./../models/order.model");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await Order.create({
      ...req.body,
      customerId: req.currentUser._id,
    });
    res.status(201);
    res.send(result);
    return result;
  } catch (error) {
    res.status(500).send({ errorMessage: "Something went wrong" });
    console.log(error);
  }
};

const changeOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const filter = { _id: orderId };
  const update = { $set: { orderStatus: req.body.orderStatus } };
  try {
    const order = await Order.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ errorMessage: "Something went wrong" });
    console.log(error);
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    res.status(200);
    res.send(order);
  } catch (error) {
    res.status(500).send({ errorMessage: "Something went wrong" });
    res.send(error);
  }
};

const getOrderByCustomerId = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.currentUser._id });
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: "Something went wrong" });
    res.send(error);
  }
};

const getOrderByLabId = async (req, res) => {
  try {
    const orders = await Order.find({ labId: req.currentUser._id });
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: "Something went wrong" });
    res.send(error);
  }
};

const getOrderByStatus = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: req.currentUser.orderStatus });
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: "Something went wrong" });
    res.send(error);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  changeOrderStatus,
  getOrderById,
  getOrderByCustomerId,
  getOrderByLabId,
  getOrderByStatus
};
