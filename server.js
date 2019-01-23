const express = require("express");
const PORT = process.env.PORT || 4000;
const app = express();
const mongoose = require("mongoose");

//establish middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//test API route
app.get("/api/coupons/:tag", function(req, res) {

  const coupon = {
    tag: req.params.tag,
    coupon: "2 for 1 Apps"
  };
  res.json( coupon )
});

//connect to mongodb
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/booksdb";
mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});