require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();
const PORT = process.env.PORT;
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
// app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/pay", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/order", async (req, res) => {
  try {
    const amount = req.body.amount;
    const instance = new Razorpay({
      key_id: process.env.YOUR_KEY_ID,
      key_secret: process.env.YOUR_SECRET,
    });

    const myOrder = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
    return res.status(201).json({
      success: true,
      amount,
      order: myOrder,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, (req, res) => {
  console.log(`App listening ate port --> http://localhost:${PORT}`);
});
