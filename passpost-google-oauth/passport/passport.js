const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

passport.serializeUser(function (user, done) {
  console.log("HERREEEEEEEEEEEEE111", user);
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  console.log("HERREEEEEEEEEEEE", user);
  User.findById(user._id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      // console.log(profile);
      User.find({ email: profile._json.email }).then((respUser) => {
        if (respUser.length) {
          // console.log("Response", respUser);
          next(null, respUser);
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
            picture: profile._json.picture,
          })
            .then((dbResp) => {
              // console.log("New User", dbResp);
              next(null, dbResp);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      // next();
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return next(err, user);
      // });
    }
  )
);

// _json: {
//   sub: '117562697306896766697',
//   name: 'Suman Acharyya',
//   given_name: 'Suman',
//   family_name: 'Acharyya',
//   picture: 'https://lh3.googleusercontent.com/a/AEdFTp5oz3BTI6PZ9L05cwQ7XQYfLCKrIQKuIHNTrdXUbg=s96-c',
//   email: 'sumanacharyya999@gmail.com',
//   email_verified: true,
//   locale: 'en'
// }
