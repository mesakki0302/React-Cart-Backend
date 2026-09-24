const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

/* ================= FORGOT PASSWORD ================= */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.UserEmail,
        pass: process.env.UserPassword
      }
    });

    await transporter.sendMail({
      from: process.env.UserEmail,
      to: email,
      subject: 'Password Reset OTP',
      html: `<h3>Your OTP is ${otp}</h3>`
    });

    res.json({ message: 'OTP sent successfully to your email' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;


    const user = await User.findOne({ email });

    if (!email || !otp || !password) {
      return res.status(400).json({message: "Email, OTP, and Password are required"});
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }


    user.password = await bcrypt.hash(password, 10);
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {forgotPassword, resetPassword}
