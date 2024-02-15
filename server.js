const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

const app = express();
const PORT = process.env.PORT || 5000;

const user = require("./routes/users");
const cors = require("cors");

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log("ERROR: ", err));

// Routes
app.use("/users", user);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});