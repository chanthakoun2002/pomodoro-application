const User = require("../models/user");
const BlacklistedToken = require("../models/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => { //generates jwt token
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const emailExist = await User.findOne({ email });
      if (emailExist) return res.status(409).json({ message: "Email already exists" });
  
      const usernameExist = await User.findOne({ username });
      if (usernameExist) return res.status(409).json({ message: "Username already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({
        message: "User has been created",
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

//for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ message: "Invalid password" });
  
      res.status(200).json({
        message: "User logged in",
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

exports.logout = async (req, res) => {
    const authHeader = req.header("Authorization");
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const blacklistedToken = new BlacklistedToken({ token });
      await blacklistedToken.save();
      res.status(200).json({ message: "Logout successful, token blacklisted" });
    } catch (error) {
      console.error("Failed to blacklist token:", error);
      res.status(500).json({ message: "Error blacklisting token" });
    }
  };

exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password"); //exclude pswd
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Profile retrieval error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };