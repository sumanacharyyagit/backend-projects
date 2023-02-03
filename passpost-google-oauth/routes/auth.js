const router = require("express").Router();
const passport = require("passport");

router.route("/login").get((req, res) => {
  res.render("login");
});

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login with Google");
  }
);

router
  .route("/google/callback")
  .get(passport.authenticate("google"), (req, res) => {
    console.log("OnRequest --> ", req.user);
  });

module.exports = router;
