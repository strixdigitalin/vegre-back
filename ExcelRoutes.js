const express = require("express");
const excelSchema = require("./RegisteredCandidate");
const {
  createOrder,
  getLogo,
  paymentCallback,
  getPayment,
} = require("./paymentControler");
const UserSchema = require("./UserSchema");
const router = express.Router();

const findclass = (item) => {
  if (item == "VII") return "07";
  if (item == "VIII") return "08";
  if (item == "IX") return "09";
  if (item == "X") return "10";
  if (item == "XI") return "11";
  if (item == "XII") return "12";
};
const fetchSrno = (item) => {
  if (item.length == 1) {
    return "000" + item;
  }
  if (item.length == 2) {
    return "00" + item;
  }
  if (item.length == 3) return "0" + item;
  else return item;
};
const checkDistrictCode = (item) => {
  if (item.length == 1) return "0" + item;
  else return item;
};
const calculateRollNumber = (data) => {
  const firstDigit =
    data.Course == "Engineering"
      ? 1
      : data.Course == "Medical"
      ? 2
      : data.Course == "Internal"
      ? 4
      : 3;
  const secthird = "23";
  const fourfive = findclass(data.Present_Class);
  const sixsev = checkDistrictCode(`${data.District_Code}`);
  const lastFour = fetchSrno(`${data.Sl_No}`);
  console.log(
    firstDigit,
    secthird,
    fourfive,
    sixsev,
    lastFour,
    data.Sl_No,
    "<<<this is roll"
  );
  return firstDigit + secthird + fourfive + sixsev + lastFour;
};

const setRollNumber = (data) => {
  let sendThis = [];
  return data.map((item) => ({ ...item, Roll_No: calculateRollNumber(item) }));
};

router.post("/upload", async (req, res) => {
  try {
    console.log(req.body);

    const { excelData, from, to } = req.body;
    // this option prevents additional documents from being inserted if one fails
    // return null;
    const options = { ordered: true };
    const result = await excelSchema.insertMany(
      setRollNumber(excelData),
      options
    );
    console.log(result, "<<<this is result");
    // await data.save();
    if (result) {
      res
        .status(200)
        .send({ success: true, message: "Data Successfully Added" });
    } else {
      res
        .status(400)
        .send({ success: false, message: "Error while uploading data" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/get", async (req, res) => {
  try {
    console.log(req.body);
    // const Student_No = req.params.mobile;
    console.log("get result");
    const data = await excelSchema.find({ ...req.query });
    // await data.save();
    if (data) {
      res
        .status(200)
        .send({ success: true, message: "Data Successfully fetched", data });
    } else {
      res
        .status(400)
        .send({ success: false, message: "Error while fetching data data" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
