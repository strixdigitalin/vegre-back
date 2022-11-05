const express = require("express");
const orderSchema = require("./orderSchema");
const {
  createOrder,
  getLogo,
  paymentCallback,
  getPayment,
} = require("./paymentControler");
const UserSchema = require("./UserSchema");
const router = express.Router();

router.post("/registration", async (req, res) => {
  console.log("asdf");
  const data = new orderSchema(req.body);
  data.save((err, result) => {
    if (err)
      res
        .status("400")
        .send({ status: false, msg: "Error while Registration", err });
    else
      res.status(200).send({
        data: data,
        status: "success",
        msg: "Registration Successfull",
      });
  });
});

router.get("/all/:id", async (req, res) => {
  const data = await orderSchema.findById(req.params.id);
  res.status(200).send(data);
});
module.exports = router;
