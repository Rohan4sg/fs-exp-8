const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const verifyToken = require("./middleware/auth");
const checkRole = require("./middleware/role");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://mountain_rat:Rohan1234@cluster0.eryiypc.mongodb.net/authDB")
  .then(() => console.log("MongoDB Connected"));


app.post("/api/login", async (req, res) => {
  console.log("BODY:", req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log("USER:", user);

  if (!user) return res.status(400).send("User not found");
  if (user.password !== password) return res.status(400).send("Wrong password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secretkey"
  );

  res.json({ token });
});


app.get("/api/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.send("Welcome Admin");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});