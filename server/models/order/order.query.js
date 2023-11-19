const Order = require('./order.model');
const User = require('../user/user.model')
const transport = require('../../middlewares/nodemailer');
const { sendNotification } = require('../../utils/helpers/sendNotifications');
const sendMessage = require("../../middlewares/twilio");
const { getMailOptions } = require('../../utils/nodemail/mailOptions');


const getAllOrdersFromDb = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.log(error);
  }
}
const getOrderByCustomerIdFromDb = async (id) => {
  try {
    const orders = await Order.find({ customerId: id });
    return orders
  } catch (error) {
    console.log(error)
  }
}
const getOrderByStatusFromDb= async (orderStatus,id) => {
  try {
    const orders = await Order.find({
      labId: id,
      orderStatus,
      paid: true,
    });
    return orders;
  } catch (error) {
    console.log(error)
  }
}
const getOrderByIdFromDb = async (id) => {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (error) {
    console.log(error)
  }
}

const addOrderToDb = async (order,currentUser) => {
    try {
        const result = await Order.create({
          ...order,
          customerId: currentUser._id,
          orderDelivaryDetails: currentUser.details,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
}
const updateOrderStatusToDb = async (orderId, filter, update,orderStatus) => {
    try {
        const order = await Order.findOneAndUpdate(filter, update, {
          new: true,
        });
        if (orderStatus === 'approved') {
          sendNotification(order.customerId, 'Your photos has been approved');
        } else if (orderStatus === 'retake_needed') {
          sendNotification(order.customerId, 'Your photos need to be retaken');
        } else if (orderStatus === 'readyToDeliver') {
          sendNotification(
            order.customerId,
            'Your photos has been picked up for delivery'
          );
        }
        return order;
      } catch (error) {
        console.log(error);
      }
}
const getOneWeekDataFromDb = async (id) => {
    try {
        const orders = await Order.find({
          labId: id,
          paid: true,
          timestamp: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
          },
        });
        return orders;
      } catch (error) {
        console.log(error)
      }
}
const orderMarkedPaidToDb = async (customerId,email) => {
    try {
        const latestOrder = await Order.findOneAndUpdate(
          {
            paid: false,
            customerId: customerId,
          },
          { $set: { paid: true } },
          { new: true }
        );
        const labUser = await User.findOne({ labId: latestOrder.labId });
        sendNotification(labUser._id, 'New order arrived');
        sendMessage("New order has arrived");
        transport(getMailOptions(email, "Your order has been placed"));
        return latestOrder
      } catch (error) {
        console.log(error);
      }
}
const getOrderByLabIdFromDb = async (id) => {
  try {
    const orders = await Order.find({
      labId: id,
      paid: true,
    });
    return orders;
  } catch (error) {
   console.log(error)
  }
}
const getOrderCountByProductCategoryFromDb = async (labId) => {
  try {
    const orders = await Order.find({ labId: labId });
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
    return stat;
  } catch (error) {
    console.log(error);
  }
}
const generateOrderIdFromDb = async (labId) => {

  try {
    const orderCountForLab = await Order.find({
      labId: labId,
    }).count();
    const orderId = `${labId}_${orderCountForLab}`;
    console.log(orderId)
    return orderId;
  } catch (error) {
    console.log(error);
  }
}
const getUserLastOrderFromDb = async (id) => {
  try {
    const latestOrder = await Order.find({
      customerId: id,
    })
      .sort({ createdAt: -1 })
      .limit(1);
    return latestOrder[0];
  } catch (error) {
    console.log(error);
  }
}

const updatePassportFromDb = async (orderId, filter,update) => {
  try {
    const order = await Order.findOneAndUpdate(filter, update, {
      new: true,
    });
    return order
  } catch (error) {
    console.log(error);
  }
}
const cleanUnpaidOrdersFromDb = async (id) => {
  try {
    await Order.deleteMany({
      paid: false,
      customerId: id,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    generateOrderIdFromDb,
    addOrderToDb,
    updateOrderStatusToDb,
    getOneWeekDataFromDb,
    orderMarkedPaidToDb,
    getAllOrdersFromDb,
    getOrderByIdFromDb,
    getOrderByCustomerIdFromDb,
    getOrderByStatusFromDb,
    getOrderByLabIdFromDb,
    getOrderCountByProductCategoryFromDb,
    getUserLastOrderFromDb,
    updatePassportFromDb,
    cleanUnpaidOrdersFromDb
}