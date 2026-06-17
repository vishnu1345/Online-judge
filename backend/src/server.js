require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/getProblems');
const submissionRoutes = require('./routes/submissionRoutes');

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin : process.env.CLIENT_URL,
  credentials : true
}));

app.use('/api/auth' , authRoutes);
app.use('/api/problems' , problemRoutes);
app.use('/api' , submissionRoutes);

app.get("/", (req, res) => {
  res.send("project running");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server running");
});
