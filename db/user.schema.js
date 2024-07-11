const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
