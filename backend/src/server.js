require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin : process.env.CLIENT_URL,
  credentials : true
}));

app.use('/api/auth' , authRoutes);

app.get("/", (req, res) => {
  res.send("project running");
});

app.listen(process.env.PORT, () => {
  console.log("server running");
});
