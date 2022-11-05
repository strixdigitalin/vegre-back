require("dotenv").config();
const uniquId = require("uniqid");
const path = require("path");
const Formidable = require("formidable");
const crypto = require("crypto");
const request = require("request");
const orderSchema = require("./orderSchema");
const Razorpay = require("razorpay");
let orderId;

// const key = "rzp_test_Mu5DUXrPHI2u7b";
// const key = "rzp_live_rWC4iXaB2ed5LL";  old key
// const secret = "8FPP04GxtDiQFf0WJEBcyfYl"; //old seceret

const key = "rzp_live_XVo1ue3IK3yAAY"; //  new key generated by me
const secret = "Qj8JmIxBHERf69sIZAb6qiu7"; // new secret generated by me
var instance = new Razorpay({
  // key_id: process.env.KEY_ID,
  key_id: key,
  key_secret: secret,
});

exports.key = key;
exports.secret = secret;
exports.createOrder = (req, res) => {
  console.log("ORders");
  // const userId = req.params.id;
  var options = {
    amount: 20000, // amount in the smallest currency unit
    // amount: 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: uniquId(),
  };
  instance.orders.create(options, async (err, order) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    orderId = order.id;
    // const updateUserORder = await orderSchema.findByIdAndUpdate(
    //   userId,
    //   { orderCreationId: order.id },
    //   { new: true }
    // );

    console.log(orderId, "<<<< this is order id");
    res.json(order);
  });
};

exports.paymentCallback = async (req, res) => {
  const form = Formidable();
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;
  console.log(orderCreationId, "<<<< this is order creation id");
  const hash = crypto
    .createHmac("sha256", secret)
    .update(orderCreationId + "|" + razorpayPaymentId)
    .digest("hex");
  console.log("here", req.body, hash);

  if (razorpaySignature === hash) {
    console.log("matched");
    const info = {
      _id: razorpayPaymentId,
      razorpay_order_id: razorpayOrderId,
    };
    // const order = new orderSchema({
    //   id: info._id,
    //   orders: razorpayOrderId,
    //   // ...req.body,
    // });

    const updateUser = await orderSchema.findByIdAndUpdate(
      req.body.userId,
      {
        paymentId: info._id,
        // orderCreationId:orderCreationId,
        orders: razorpayOrderId,
        payment: true,
      },
      { new: true }
    );
    if (updateUser) {
      res
        .status(200)
        .send({ status: true, msg: "Payment Successful", updateUser });
    } else {
      res.status(400).json({
        error: "Not able to save in Db",
      });
    }

    // order.save((err, data) => {
    //   if (err) {
    //     res.status(400).json({
    //       error: "Not able to save in Db",
    //     });
    //   } else {
    //     console.log("success");
    //     res.status(200).send({ status: true, msg: "Payment Successful" });
    //     // res.redirect(
    //     //   `http://localhost:3000/payment/status/${razorpayPaymentId}`
    //     // );
    //   }
    // });
  } else {
    console.log("success in else ");
    res.send("ERROR");
  }

  // if (fields) {
  //   const hash = crypto
  //     .createHmac("sha256", secret)
  //     .update(orderId + "|" + fields.razorpay_payment_id)
  //     .digest("hex");
  //   console.log("FIELDS", fields, hash);

  //   if (fields.razorpay_signature === hash) {
  //     console.log("matched");
  //     const info = {
  //       _id: fields.razorpay_payment_id,
  //       razorpay_order_id: fields.razorpay_order_id,
  //     };
  //     const order = new orderSchema({
  //       _id: info._id,
  //       orders: fields.razorpay_order_id,
  //     });

  //     order.save((err, data) => {
  //       if (err) {
  //         res.status(400).json({
  //           error: "Not able to save in Db",
  //         });
  //       } else {
  //         res.redirect(
  //           `${process.env.FRONTEND}/payment/status/${fields.razorpay_payment_id}`
  //         );
  //       }
  //     });
  //   } else {
  //     res.send("ERROR");
  //   }
  // } else {
  //   console.log(err);
  // }
};

exports.getLogo = (req, res) => {
  res.sendFile(path.join(__dirname, "mask.svg"));
};

exports.getPayment = (req, res) => {
  orderSchema.findById(req.params.paymentId).exec((err, data) => {
    if (err || data == null) {
      return res.json({
        error: "No order Found",
      });
    }
    request(
      `https://${process.env.KEY_ID}:${process.env.SECREAT_KEY}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
      function (error, response, body) {
        if (body) {
          const result = JSON.parse(body);
          res.status(200).json(result);
        }
      }
    );
  });
};
