const NotificationSubscribers = require('./notifications.model');

const setSubscriberToDb = async (newSub)=>{
    try {
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
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
    setSubscriberToDb
}