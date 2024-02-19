const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    console.log("req.body", req.body);
    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        errors.email = "Email already exists !";
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

module.exports = router;