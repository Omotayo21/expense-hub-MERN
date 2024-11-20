// controllers/authController.js

const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const { sendEmail } = require("../helpers/mailer");

// POST: Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    const savedUser = await newUser.save();

   
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    res.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
