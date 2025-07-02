const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const generateTokenAndSaveInCookies = async (userId, res) => {
const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
  expiresIn: "10d"
})

// send cookie
res.cookie("jwt", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
})

await User.findByIdAndUpdate(userId, {token})
return token;
};

module.exports = { generateTokenAndSaveInCookies }