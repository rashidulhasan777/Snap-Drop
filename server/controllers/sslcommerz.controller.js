const SSLCommerzPayment = require("sslcommerz-lts");
const is_live = false;

const initPayment = (req, res) => {
  console.log("here");
  const amount = req.params.amount;
  const order_id = req.params.order_id;

  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: order_id, // use unique tran_id for each api call
    success_url: "https://snapdropbd.fly.dev/payment-success",
    fail_url: "https://snapdropbd.fly.dev/payment-failure",
    cancel_url: "https://snapdropbd.fly.dev/payment-cancel",
    ipn_url: "https://snapdropbd.fly.dev/payment-ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    is_live
  );
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // res.redirect(GatewayPageURL);
    res.status(200).send({ url: GatewayPageURL });
    console.log("Redirecting to: init ", GatewayPageURL);
  });
};
//FAILED
//VALID
const success = async (req, res) => {
  try {
    // console.log(req.body);
    const data = { val_id: req.body.val_id };
    const sslcz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      is_live
    );
    sslcz.validate(data).then((data) => {
      console.log("success1", data);
      // if (data.status === "VALIID")
      res.redirect(301, `${process.env.BASE_FRONTEND_URL}/order_done`);
      // else res.redirect(`${process.env.BASE_FRONTEND_URL}/payment_failed`);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const failure = async (req, res) => {
  console.log("Failed", req.body);
  return res.status(400).send(req.body);
};
const cancel = async (req, res) => {
  return res.status(200).send(req.body);
};
const ipn = async (req, res) => {
  try {
    console.log("ipn", req.body);
  } catch (error) {
    console.log("ipn validation", error);
  }
};
const validate = (req, res) => {
  const data = {
    val_id: ADGAHHGDAKJ456454, //that you go from sslcommerz response
  };
  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    is_live
  );
  sslcz.validate(data).then((data) => {
    return res.send(data);
    //process the response that got from sslcommerz
    // https://developer.sslcommerz.com/doc/v4/#order-validation-api
  });
};

module.exports = { initPayment, success, failure, cancel, ipn };
