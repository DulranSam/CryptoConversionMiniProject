const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const home = require("./routes/home");

app.use(express.json());
app.use(cors());
app.use("/home", home);

async function start() {
  try {
    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Started");
  }
}

start();
