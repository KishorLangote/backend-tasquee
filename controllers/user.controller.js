const User = require("../models/user.model")
const { z } = require("zod")
const bcrypt = require("bcryptjs")
const { generateTokenAndSaveInCookies } = require("../jwt/token")

// user schema validation

 const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username atleast 3 characters long" })
    .max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password atleast 6 characters long" }),
});

// register user

 const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const validation = userSchema.safeParse({ username, email, password });
    // error messages from zod library
    if (!validation.success) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ errors: "User already registered." });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save(); // new user saved in the db
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      res
        .status(201)
        .json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
};

// login user

 const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }
    // create token
    const token = await generateTokenAndSaveInCookies(user._id, res);
    
    res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while logging in the user." });
  }
};

// logout user

const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
       httpOnly: true,
       secure: true,
       sameSite: "none",
       path: "/",
       maxAge: 24 * 60 * 60 * 1000,
    })
    res.status(200).json({ message: "User logged out successfully" })
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while loggin the user." });
  }
};


module.exports = { register, login, logout }