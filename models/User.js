const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Languages = require("../constants/constants");

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  dailyStreak: {
    type: Number,
    default: 0,
  },
  primaryLanguage: {
    type: String,
    default: Languages.ENGLISH,
  },
  learningLanguage: {
    type: String,
    default: Languages.GERMAN,
  },
  learnedLessons: {
    type: Array,
    default: [],
  },
  forReview: {
    type: Array,
    default: [],
  },
  isProUser: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: {
    type: String,
    default: "",
  },
  passwordResetExpires: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
