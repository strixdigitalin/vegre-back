const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orders: {
      type: Array,
      default: [],
    },
    field: String,
    studying: String,
    paymentId: String,
    name: String,
    dob: String,
    father: String,
    appearDistrict: String,
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
    medium: String,
    aadhar: Number,
    category: String,
    orderCreationId: String,
    payment: {
      type: Boolean,
      default: false,
    },
    school: String,
    board: String,
  },
  {
    timestamps: {
      // createdAt: { type: Date },
      // updatedAt: { type: Date },
    },
  }
);

module.exports = mongoose.model("Order", orderSchema);
