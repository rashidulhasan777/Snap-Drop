const Order = require('../models/order/order.model');
const transport = require('../');
const { getMailOptions } = require('./../utils/nodemail/mailOptions');
const User = require('../models/user/user.model');
const { sendNotification } = require('../utils/helpers/sendNotifications');
const sendMessage = require("./../middlewares/twilio");
const { addOrderToDb, updateOrderStatusToDb, getOneWeekDataFromDb, orderMarkedPaidToDb } = require('../models/order/order.query');

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersFromDb()
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await addOrderToDb(req.body, req.currentUser);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const changeOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const filter = { _id: orderId };
  const update = { $set: { orderStatus: req.body.orderStatus } };
  try {
    const order = await updateOrderStatusToDb(orderId, filter, update);
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await getOrderByIdFromDb(orderId)
    res.status(200);
    res.send(order);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};

const getOrderByCustomerId = async (req, res) => {
  try {
    const orders = await getOrderByCustomerIdFromDb(req.currentUser._id)
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
    const orders = await getOrderByStatusFromDb(orderStatus,req.currentUser.labId)
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};

const getOrderByLabId = async (req, res) => {
  try {
    const orders = await getOrderByLabIdFromDb(req.currentUser.labId)
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    res.send(error);
  }
};
const getOneWeekData = async (req, res) => {
  try {
    const orders = getOneWeekDataFromDb(req.currentUser.labId)
    res.status(201);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ error:error,errorMessage: 'Something went wrong' });
  }
};

const setOrderPaid = async (req, res) => {
  try {
    const latestOrder = await orderMarkedPaidToDb(req.currentUser._id,req.currentUser.email)
    res.status(201).send(latestOrder);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const cleanUnpaidOrders = async (req, res) => {
  try {
    await cleanUnpaidOrdersFromDb(req.currentUser._id)
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
    const order = await updatePassportFromDb(orderId, filter, update)
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const getUserLastOrder = async (req, res) => {
  try {
    const latestOrder = await getUserLastOrderFromDb(req.currentUser._id)
    res.status(200).send(latestOrder[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong.' });
  }
};

const generateOrderId = async (req, res) => {
  try {
    const orderId = await generateOrderIdFromDb(req.currentUser.labId)
    res.status(200).send({ orderId });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

const getOrderCountByProductCategory = async (req, res) => {
  try {
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
