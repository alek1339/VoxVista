const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/User");

// @route   GET users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route  GET user/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      errors.username = "Email already exists !";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route  GET user/login
// @desc Login user / Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    User.findOne({ username: username }).then((user) => {
      // Check for user
      console.log("user", req.body);
      if (!user) {
        return res.status(404).json({ username: "User not found" });
      }
      // Check Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, username: user.username }; // Create JWT Payload
          // Sign Token
          jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          });
        } else {
          return res.status(400).json({ password: "Password incorrect" });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
