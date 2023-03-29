if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const router = require('./routes');
const { sendNotification } = require('./utils/helpers/sendNotifications');

const corsConfig = {
  origin: [process.env.BASE_FRONTEND_URL, 'http://localhost:8000'],
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
app.use(router);

(async function () {
  try {
    server.listen(process.env.PORT || 3000, () => {
      console.log('Server started on ' + (process.env.PORT || 3000));
    });
  } catch (error) {
    console.log(`Something went wrong! ${error}`);
  }
})();
