const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser.js');

const JWT_SECRET = 'mohitisagoodboy$';

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // Validation errors, send response with errors
      return res.status(400).json({success, errors: result.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    try {
      // Check if user exists
      let user = await User.findOne({email : req.body.email})
      if(user){
        return res.status(400).json({success, error:"Sorry a user with this email already exists."})
      }
      // Valid data, create user in MongoDB
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({success,authToken});
    } catch (error) {
      // Handle any potential errors during the database operation
      res.status(500).json({ error: error.message });
    }
  }
);

// Authenticate a User using : POST "/api/auth/login" . No Login Required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // Validation errors, send response with errors
      return res.status(400).json({ errors: result.array() });
    }

    const {email,password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Enter valid credentials"})
      }

      const passwordCompare = await bcrypt.compare(password,user.password);

      if(!passwordCompare){
        success = false;
        return res.status(400).json({success,error:"Enter valid credentials"})
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({success,authToken}); 


    } catch (error) {
      // Handle any potential errors during the database operation
      res.status(500).json({ error: error.message });
    }
  }
);

// Get a logged in User details using : POST "/api/auth/getuser" . Login Required

router.post(
  "/getuser",fetchuser,
  async (req, res) => {

    try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    

  });


module.exports = router;
