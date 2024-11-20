// controllers/authController.js

const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST: User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    // Validate password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Create token data
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    // Create JWT token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

   
    res.cookie("token", token, {
      httpOnly: true,
    
    });

   res.json({
      message: "Login successful",
      success: true,
      token : token
    });
   
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};
