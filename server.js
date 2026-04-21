// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors());

// ================= MONGODB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("Error ❌", err));

// ================= USER SCHEMA =================
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", userSchema);

// ================= REGISTER API =================
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.json({ msg: "User already exists ❌" });
        }

        // create new user
        const newUser = new User({ username, password });
        await newUser.save();

        res.json({ msg: "Registered Successfully ✅" });

    } catch (err) {
        res.json({ msg: "Error ❌", error: err });
    }
});

// ================= LOGIN API =================
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

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
    res.send("Server chal raha hai 🚀");
});

// ================= START SERVER =================
app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});












MONGO_URI=mongodb://dreamhub:Alok2007@cluster0-shard-00-00.t4hpwn.mongodb.net:27017,cluster0-shard-00-01.t4hpwn.mongodb.net:27017,cluster0-shard-00-02.t4hpwn.mongodb.net:27017/?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority

PORT=3000
