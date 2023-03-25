const Order = require('./../models/order.model');

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
      orderDelivaryDetails: req.currentUser.details,
    });
    res.status(201);
    res.send(result);
    return result;
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
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
    res.status(500).send({ errorMessage: 'Something went wrong' });
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
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};

const getOrderByCustomerId = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.currentUser._id });
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};

const getOrdersbyStatus = async (req, res) => {
  const orderStatus = req.params.status;
  try {
    const orders = await Order.find({ orderStatus, paid: true });
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};

const getOrderByLabId = async (req, res) => {
  try {
    const orders = await Order.find({ labId: req.currentUser._id });
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};
const setOrderPaid = async (req, res) => {
  try {
    const latestOrder = await Order.findOneAndUpdate(
      {
        paid: false,
        customerId: req.currentUser._id,
      },
      { $set: { paid: true } },
      { new: true }
    );
    res.status(201).send(latestOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};
const cleanUnpaidOrders = async (req, res) => {
  try {
    await Order.deleteMany({
      paid: false,
      customerId: req.currentUser._id,
    });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const updatePassport = async (req, res) => {
  const orderId = req.params.id;
  const filter = { _id: orderId };
  const update = { $set: { passportPictures: req.body } };
  try {
    const order = await Order.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    console.log(error);
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  changeOrderStatus,
  getOrderById,
  getOrderByCustomerId,
  getOrderByLabId,
  getOrdersbyStatus,
  setOrderPaid,
  cleanUnpaidOrders,
  updatePassport
};
