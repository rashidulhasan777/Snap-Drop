const NotificationSubscribers = require('../models/notifications.model');

const getSubscriberById = async (id) => {
  try {
    const sub = await NotificationSubscribers.findOne({ userId: id });
    return sub;
  } catch (error) {
    console.log(error);
  }
};

const setASubscriber = async (req, res, next) => {
  const newSub = req.body;
  try {
    console.log(req.body);
    const existingSub = await NotificationSubscribers.findOne({
      userId: newSub.userId,
    });
    if (existingSub) {
      existingSub.subscriptionObject = newSub.subscriptionObject;
      await existingSub.save();
      console.log(existingSub);
    } else {
      await NotificationSubscribers.create(newSub);
    }
    res.status(201).send({ msg: 'Stored' });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
  setASubscriber,
};
