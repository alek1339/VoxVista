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
      return res.status(404).json({ msg: "Username already exists !" });
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
            .catch((err) => {
              console.log(err);
              res.status(500).json({ msg: "Error during registration." });
            });
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

// @route  GET users/current
// @desc Return current user
// @access Private
router.post("/current", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    const [bearer, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, "secret");
    // Get the user from the decoded token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Respond to the client with the user object
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error" + error.message);
  }
});

module.exports = router;
