const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoute = require("./paymentRoute");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

// .connect("mongodb://localhost:27017/paymentorder", {
mongoose
  .connect(
    "mongodb+srv://bobprep:bobprep@cluster0.j7ff2bf.mongodb.net/?retryWrites=true&w=majority",
    {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB CONNECTEDd"))
  .catch(() => console.log("FAILED TO CONNET WITH DB"));

app.use(bodyParser.json());
app.use(cors());

app.use("/api", paymentRoute);
app.use("/user", require("./Userroutes"));
app.use("/enquiry", require("./EnquiryRoute"));
app.use("/excel", require("./ExcelRoutes"));

// app.listen(process.env.PORT || 5000, () => {
app.listen(80, () => {
  console.log(`App is running at 5000 port`);
});
