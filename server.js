const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

/* ================================
   🔗 MongoDB Connection
================================ */
mongoose.connect("mongodb+srv://ok21815_db_user:Alok2007@cluster0.t4hpwn6.mongodb.net/dreamhub")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

/* ================================
   👤 User Schema
================================ */
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema);

/* ================================
   📝 Register API
================================ */
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ msg: "User already exists ❌" });
    }

    // save new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ msg: "Registered Successfully ✅" });
  } catch (err) {
    res.json({ msg: "Error ❌", error: err });
  }
});

/* ================================
   🔐 Login API
================================ */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
      res.json({ msg: "Login Success ✅" });
    } else {
      res.json({ msg: "Invalid Credentials ❌" });
    }
  } catch (err) {
    res.json({ msg: "Error ❌", error: err });
  }
});

/* ================================
   🌐 Test Route
================================ */
app.get("/", (req, res) => {
  res.send("Server chal raha hai 🚀");
});

/* ================================
   🚀 Start Server
================================ */
app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
