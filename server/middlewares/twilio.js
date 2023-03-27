const accountSid = 'ACcbcf082438219ed4b54aeb2dfb428f8a'; 
const authToken = 'ead3ee6d3ff3c024b7751e6ac29db96b'; 
const client = require('twilio')(accountSid, authToken);

function sendMessage(body){
    client.messages 
      .create({ 
         body: 'Hello',  
         messagingServiceSid: 'MG8cdf69b47ecd32ee6c300cc8fd89c682',      
         to: '+8801768574302' 
       }) 
      .then(message => console.log(message.sid)) 
}

module.exports = sendMessage;