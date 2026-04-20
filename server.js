const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/dreamhub")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const User = mongoose.model("User", {
  email: String,
  password: String
});

app.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({ email: req.body.email, password: hash });
  await user.save();
  res.json({ msg: "Registered" });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ msg: "User not found" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secret123");
  res.json({ token });
});

app.listen(5000, () => console.log("Server running"));
