const Order = require('./order.model');
const User = require('../user/user.model')
const transport = require('../../middlewares/nodemailer');
const { sendNotification } = require('../../utils/helpers/sendNotifications');
const sendMessage = require("../../middlewares/twilio");
const { getMailOptions } = require('../../utils/nodemail/mailOptions');


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
const updateOrderStatusToDb = async (orderId, filter, update) => {
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

module.exports = {
    addOrderToDb,
    updateOrderStatusToDb,
    getOneWeekDataFromDb,
    orderMarkedPaidToDb
}