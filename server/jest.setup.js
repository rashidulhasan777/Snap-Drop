const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
beforeAll((done) => {
    done()
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
},30000);

afterAll( (done) => {
   mongoose.disconnect();
  done()
});
