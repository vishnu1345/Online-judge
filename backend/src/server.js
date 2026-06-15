require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const app = express();

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("project running");
});

app.listen(process.env.PORT, () => {
  console.log("server running");
});
