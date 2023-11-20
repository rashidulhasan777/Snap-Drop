const NotificationSubscribers = require('../models/notifications/notifications.model');
const { setSubscriberToDb } = require('../models/notifications/notifications.query');

const setASubscriber = async (req, res, next) => {
  const newSub = req.body;
  try {
    const existingSub = await setSubscriberToDb(newSub)
    res.status(201).send({ msg: 'Stored' });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
  setASubscriber,
};
