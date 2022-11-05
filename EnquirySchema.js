const mongoose = require("mongoose");

const Enquiry = new mongoose.Schema({
  name: "String",
  mobile: "String",
  email: "String",
  message: "String",
});

module.exports = mongoose.model("Enquiry", Enquiry);
