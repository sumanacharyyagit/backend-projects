require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/mongoDB");
const authRouter = require("./routes/auth");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportConfig = require("./passport/passport");

// DB Connection
connectToDB(`${process.env.MONGO_URI}/passportauth`);
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(
  cookieSession({
    maxAge: process.env.COOKIE_SESSION_MAX_AGE * 24 * 60 * 60 * 100,
    keys: [`${process.env.COOKIE_SESSION_KEYS}`],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`App listening at Port ---> http://localhost:${PORT}`);
});
