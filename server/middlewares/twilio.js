// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

function sendMessage(body){
  console.log('twilio active')
    // client.messages
    //   .create({
    //      body: 'Message from Snapdrop :' + body,
    //      messagingServiceSid: 'MG8cdf69b47ecd32ee6c300cc8fd89c682',
    //      to: '+8801768574302'
    //    })
    //   .then(message => console.log(message.sid))
  console.log(body);

}

module.exports = sendMessage;

//messaging service SID = MG8cdf69b47ecd32ee6c300cc8fd89c682;
