const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

 const authenticate = async (req, res, next) => {
const token = req.cookies.jwt
console.log("token:", token)
if(!token) {
  return res.status(401).json({ message: "Unauthorized"})
}

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  req.user = await User.findById(decoded.userId)
  console.log("user in request:", req.user);
  next()
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "" + error.message})
  
}


}

module.exports = authenticate 