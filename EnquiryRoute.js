const express = require("express");
const EnquirySchema = require("./EnquirySchema");

const UserSchema = require("./UserSchema");
const router = express.Router();

router.post("/post", async (req, res) => {
  const data = new EnquirySchema(req.body);
  console.log(data);
  data.save((err, result) => {
    if (err)
      res
        .status("400")
        .send({ status: false, msg: "Error while Sending Enquiry" });
    else
      res.status(200).send({
        data: data,
        status: "success",
        msg: "Enquiry Sent",
      });
  });
});
router.get("/get", async (req, res) => {
  const data = await EnquirySchema.find(req.query);
  console.log(data);
  res.status(200).send({
    data: data,
    status: "success",
    msg: "Enquiry fetch",
  });
});
module.exports = router;
