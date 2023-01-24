const jwt = require("jsonwebtoken");
const User = require("../model/user");

const isAuth = async (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.cookies?.token ||
    req.body.token;
  if (!token) {
    return res.status(403).json({
      message: "Token is missing",
    });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    // Bring Info from DB using DB or Decoded token data
    const dbUserData = await User.findById(decodeToken.user_id).select(
      "-password"
    );
    // req.user = decodeToken;
    req.user = dbUserData;
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
  return next();
};

module.exports = isAuth;
