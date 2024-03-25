const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendPasswordResetEmail = require("../controllers/emailController");
const generateUniqueToken = require("../controllers/generateUniqueToken");

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
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
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
          return res.status(400).json({ msg: "Password incorrect" });
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

    // Create a sanitized user object without the password field
    const sanitizedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dailyStreak: user.dailyStreak,
      primaryLanguage: user.primaryLanguage,
      learningLanguage: user.learningLanguage,
      isProUser: user.isProUser,
      isAdmin: user.isAdmin,
    };

    // Respond to the client with the user object
    res.json(sanitizedUser);
  } catch (error) {
    res.status(500).send("Server error" + error.message);
  }
});

// Route for initiating a password reset
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a unique token (e.g., using a library like 'crypto' or 'uuid')
    const token = await generateUniqueToken();
    console.log("Generated Token:", token);
    // Find the user by their email and update the password reset token and its expiration
    const user = await User.findOneAndUpdate(
      { email },
      {
        passwordResetToken: token,
        passwordResetExpires: Date.now() + 3600000, // Token expires in 1 hour (adjust as needed)
      },
      { new: true }
    );

    if (!user) {
      // Handle the case where the email doesn't match any user
      return res.json({ msg: "No user found with that email address" });
    }

    // Send a password reset email to the user's email address with a link containing the token
    sendPasswordResetEmail(email, token);

    // Respond to the client with a success message
    res.json({ msg: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Server Error");
  }
});

// Route for resetting a password

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    // Find the user by the password reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      // Handle the case where the token doesn't match any user
      return res.status(404).json({ message: "Invalid token" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the user's password and password reset token
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user object
    user.save();

    // Respond to the client with a success message
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Server Error");
  }
});

// Update user
router.put("/update", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the user object with the new data
    user.username = req.body.username;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.primaryLanguage = req.body.primaryLanguage;
    user.learningLanguage = req.body.learningLanguage;
    user.isProUser = req.body.isProUser;
    user.isAdmin = req.body.isAdmin;

    // Save the updated user object
    user.save();

    // Respond to the client with the updated user object
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error" + error.message);
  }
});

// Change password
router.put("/change-password", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check Password
    bcrypt.compare(req.body.oldPassword, user.password).then((isMatch) => {
      if (isMatch) {
        // Hash the new password
        const saltRounds = 10;
        bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save();
          res.json({ msg: "Password updated successfully" });
        });
      } else {
        return res.status(400).json({ msg: "Old password incorrect" });
      }
    });
  } catch (error) {
    res.status(500).send("Server error" + error.message);
  }
});

// Delete user
router.delete("/delete", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete the user object
    User.deleteOne({ _id: req.body.id })
      .then(() => {
        res.json({ ok: "User deleted successfully" });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Error during deletion." });
      });
  } catch (error) {
    res.status(500).send("Server error" + error.message);
  }
});

module.exports = router;
