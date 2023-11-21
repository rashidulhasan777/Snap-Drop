if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const userRouter = require('./routes/user/user.routes');
const sslCommerzRouter = require('./routes/sslCommerz/sslCommerz.routes');
const pathaoRouter = require('./routes/pathao/pathao.routes');
const cartRouter = require('./routes/cart/cart.routes');
const labRouter = require('./routes/lab/lab.routes');
const oauthRouter = require('./routes/oAuth/oAuth.routes');
const orderRouter = require('./routes/order/order.routes');

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const { sendNotification } = require('./utils/helpers/sendNotifications');

const corsConfig = {
  origin: [
    process.env.BASE_FRONTEND_URL,
    'http://localhost:8000',
    'http://localhost:4200',
    'http://localhost:3000',
  ],
  credentials: true,
};
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: corsConfig });

io.on('connection', async (socket) => {
  socket.on('gimmeNotification', (data) => {});
});

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  userRouter,
  sslCommerzRouter,
  pathaoRouter,
  cartRouter,
  labRouter,
  oauthRouter,
  orderRouter
);

(async function () {
  try {
    server.listen(process.env.PORT || 3000, () => {
      console.log('Server started on ' + (process.env.PORT || 3000));
    });
  } catch (error) {
    console.log(`Something went wrong! ${error}`);
  }
})();

module.exports = { app, io };
