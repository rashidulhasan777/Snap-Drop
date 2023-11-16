const SSLCommerzPayment = require("sslcommerz-lts");
const { paymentInitialize, getSucess } = require("../models/sslCommerz/query");
const is_live = false;

const initPayment = async(req, res) => {
  const amount = req.params.amount;
  const order_id = req.params.order_id;
  try{
    const GatewayPageURL =await paymentInitialize(amount, order_id)
    res.status(200).send({ url: GatewayPageURL });
  } catch(error){
    res.status(500).send({ errorMessage: 'Something went wrong in payment' });
  }
    
};
const success = async (req, res) => {
  console.log("Success", req.body);
  try {
    const data = { val_id: req.body.val_id };
    const response = await getSucess(data);
    if(response){
      res.redirect(301, `${process.env.BASE_FRONTEND_URL}/order_done`);
    }      
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
