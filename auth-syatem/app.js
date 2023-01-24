require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All fields are required!");
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      res.status(401).send("User is already exist!");
    }

    const myEncryptPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: myEncryptPass,
    });

    //   Token
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    // UPDATE in DB or Not...?

    user.password = undefined;

    // Send Token or Send -Success & redirected to Login (CHOIce)
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(401).send("Field is missing");
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    // const user = await User.findOne({ email: email.toLowerCase() });
    // if (!user) {
    //   res.status(400).send("Email is not registered!");
    // }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.SECRET_KEY,
        {
          expiresIn: Date.now() + 3 * 24 * 60 * 60 * 1000,
        }
      );
      user.token = token;
      user.password = undefined;
      // return res.status(200).json(user);

      // If I want to use in Cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }
    return res.status(400).send("Email or Password is incorrect!");
  } catch (err) {
    console.log(err);
  }
});

app.get("/dashboard", isAuth, (req, res) => {
  res.status(200).send("Welcome to Dashboard!");
});

module.exports = app;
