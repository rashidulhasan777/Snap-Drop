const accountSid = 'ACcbcf082438219ed4b54aeb2dfb428f8a'; 
const authToken = 'd6afa550a86c04c732920220e3a819f0'; 
const client = require('twilio')(accountSid, authToken);

function sendMessage(body){ 
  console.log('twilio active')
    client.messages
      .create({
         body: 'Message from Snapdrop :' + body,
         messagingServiceSid: 'MG8cdf69b47ecd32ee6c300cc8fd89c682',    
         to: '+8801768574302'
       })
      .then(message => console.log(message.sid))
}

module.exports = sendMessage;

//messaging service SID = MG8cdf69b47ecd32ee6c300cc8fd89c682;
