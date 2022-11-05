const mongoose = require("mongoose");

const User = new mongoose.Schema({
  field: String,
  studying: String,
  name: String,
  dob: String,
  father: String,
  address: String,
  email: String,
  mobile: Number,
  district: String,
  city: String,
  pin: String,
  state: String,
  fatherOccupation: String,
  mobileFather: String,
  motherOccupation: String,
  motherMobile: String,
});

module.exports = mongoose.model("Students_registration", User);
