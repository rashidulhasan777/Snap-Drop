if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const cors = require("cors");
const app = express();
const router = require("./routes");

const corsConfig = {
  origin: "http://localhost:4200",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

(async function () {
  try {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server started on " + (process.env.PORT || 3000));
    });
  } catch (error) {
    console.log(`Something went wrong! ${error}`);
  }
})();
