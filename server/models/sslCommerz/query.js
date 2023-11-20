const SSLCommerzPayment = require("sslcommerz-lts");
const { Reject } = require("twilio/lib/twiml/VoiceResponse");
const is_live = false;

const paymentInitialize = (amount, order_id) => {
    try{
        const data = {
            total_amount: amount,
            currency: "BDT",
            tran_id: order_id, // use unique tran_id for each api call
            success_url: "http://localhost:8080/payment-success",
            fail_url: "http://localhost:8080/payment-failure",
            cancel_url: "http://localhost:8080/payment-cancel",
            ipn_url: "http://localhost:8080/payment-ipn",
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
          return new Promise((resolve, reject) => {
            sslcz.init(data).then((apiResponse) => {
              let GatewayPageURL = apiResponse.GatewayPageURL;
              resolve(GatewayPageURL)})});

    } catch(error){ 
        console.log(error);
        reject(error);
    }
};

const getSucess = (data)=>{
    try {
        const sslcz = new SSLCommerzPayment(
          process.env.STORE_ID,
          process.env.STORE_PASSWORD,
          is_live
        );
        return new Promise((resolve, reject) => {
            sslcz.validate(data).then((apiResponse) => {
              console.log(apiResponse);
              resolve(apiResponse)})});
      } catch (error) {
        console.log(error);
        reject(error);
      }
}

module.exports = {
    paymentInitialize,
    getSucess
}