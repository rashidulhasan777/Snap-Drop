const sendMessage = require("./../middlewares/twilio");

const sendMessageController = async (req, res) => {
  try {
    sendMessage("New order has arrived");
    res.status(201);
    res.send("Message sent");
  } catch (error) {
    res.status(500).send({ errorMessage: "Something went wrong" });
    console.log(error);
  }
};

module.exports = sendMessageController;
