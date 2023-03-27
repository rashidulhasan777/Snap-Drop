const fs = require("fs");
const path = require("path");
const getMailOptions = (receiver, data) => {
  const html = fs.readFileSync(
    path.join(__dirname, "./mailbody.html"),
    "utf-8"
  );
  let mailOptions = {
    from: "snapdropproduction@gmail.com",
    to: receiver,
    subject: "Order Status from Snapdrop",
    html,
  };
  return mailOptions;
};

module.exports = { getMailOptions };
