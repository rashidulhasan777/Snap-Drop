const Notifications = require('../../models/notifications/notifications.model');

const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:ssirajis5271@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const seeIfSubscribes = async (userId) => {
  try {
    const subscriber = await Notifications.findOne({ userId });
    if (subscriber) return subscriber;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const sendNotification = async (userId, message) => {
  try {
    const sub = await seeIfSubscribes(userId);
    if (!sub) return;
    console.log(sub);
    const notificationPayload = {
      notification: {
        title: message,
        body: 'Check on the app',
        // icon: 'assets/main-page-logo-small-hat.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
          onActionClick: {
            default: {
              operation: 'navigateLastFocusedOrOpen',
              url: '/login',
            },
          },
        },
        actions: [],
      },
    };
    await webpush.sendNotification(
      sub.subscriptionObject,
      JSON.stringify(notificationPayload)
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendNotification };
