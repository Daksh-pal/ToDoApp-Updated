import User from "../databaseModels/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User register
export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    return res
      .status(201)
      .json({ message: "User Registered successfully", token });
  } catch (error) {
    console.log("Error in user registration ->", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// User login
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    const token = createToken(user._id);
    return res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.log("Error in user login ->", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// JWT token
const createToken = (id, res) => {
  return jwt.sign({ id }, process.env.JWTKEY, { expiresIn: "1h" });
};