const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const {forgotPassword,resetPassword} = require("../Controller/authController");

/* SIGN UP */
router.post("/register", async (req, res) => {
  try{
    
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  console.log(user)

  res.status(201).json({ message: "User registered successfully" });}  

  catch(error){
    res.status(500).json({message:error.message})
  }
  
});

/* LOGIN */
router.post("/login", async (req, res) => {

  try{  

  const { email, password } = req.body;


  if(!email || !password){
    return res.status(400).json("All fields required");
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json("User not found");

  const isMatch = await bcrypt.compare(password,user.password);
  if (!isMatch) return res.status(401).json("Invalid password");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });}
  catch(error){
    console.log(error)
    res.status(500).json({message:error.message})
  }

}); 

router.post('/forgot-password', forgotPassword)

router.post('/reset-password', resetPassword)

module.exports = router;
