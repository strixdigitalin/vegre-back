const mongoose = require("mongoose");

const User = new mongoose.Schema({
  AADHAR_NO: { type: Number },
  Roll_Number: String,
  APPEAR_DISTRICT: String,
  Class: String,
  Course: String,
  DATE: String,
  DOB: String,
  District: String,
  Father_No: String,
  Father_name: String,
  LANGUAGE: String,
  Mother_No: String,
  Remarks: String,
  SMS: String,
  Sl_No: String,
  Student_Name: String,
  Student_No: String,
  TYPE: String,
  Roll_No: String,
  TEST_CENTER: String,
  TEST_DATE: String,
  TEST_TIME: String,
});

module.exports = mongoose.model("excel_entry", User);
