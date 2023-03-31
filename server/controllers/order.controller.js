const Order = require('./../models/order.model');
const transport = require('./../middlewares/nodemailer');
const { getMailOptions } = require('./../utils/nodemail/mailOptions');
const User = require('../models/user.model');
const { sendNotification } = require('../utils/helpers/sendNotifications');

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
    const labUser = await User.findOne({ labId: result.labId });
    sendNotification(labUser._id, 'New order arrived');
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
    if (req.body.orderStatus === 'approved') {
      sendNotification(order.customerId, 'Your photos has been approved');
    } else if (req.body.orderStatus === 'retake_needed') {
      sendNotification(order.customerId, 'Your photos need to be retaken');
    } else if (req.body.orderStatus === 'readyToDeliver') {
      sendNotification(
        order.customerId,
        'Your photos has been picked up for delivery'
      );
    }
    // transport(getMailOptions("nafizfuad0230@gmail.com", "Hello"));

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
    const orders = await Order.find({
      labId: req.currentUser.labId,
      orderStatus,
      paid: true,
    });
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};

const getOrderByLabId = async (req, res) => {
  try {
    const orders = await Order.find({ labId: req.currentUser.labId });
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};
const getOneWeekData = async (req, res) => {
  try {
    const orders = await Order.find({
      labId: req.currentUser.labId,
      timestamp: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
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
  const update = {
    $set: { passportPictures: req.body, orderStatus: 'pending' },
  };
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

const getUserLastOrder = async (req, res) => {
  try {
    const latestOrder = await Order.find({
      customerId: req.currentUser._id,
    })
      .sort({ createdAt: -1 })
      .limit(1);
    res.status(200).send(latestOrder[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong.' });
  }
};

const generateOrderId = async (req, res) => {
  try {
    const orderCountForLab = await Order.find({
      labId: req.body.labId,
    }).count();
    const orderId = `${req.body.labId}_${orderCountForLab}`;
    res.status(200).send({ orderId });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const getOrderCountByProductCategory = async (req, res) => {
  try {
    // const orders = await Order.find({ labId: req.currentUser.labId });
    const orders = await Order.find({ labId: req.currentUser.labId });
    const stat = {
      '4R': 0,
      '6R': 0,
      '8R': 0,
      '10R': 0,
      passport: 0,
    };
    orders.forEach((order) => {
      stat['passport'] += order.passportPictures.length;
      order.galleryPictures.forEach((galleryPicture) => {
        stat[galleryPicture.photoSize]++;
      });
    });
    res.status(200).send({ stat });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Cannot fetch stats' });
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
  updatePassport,
  getUserLastOrder,
  getOneWeekData,
  generateOrderId,
  getOrderCountByProductCategory,
};
