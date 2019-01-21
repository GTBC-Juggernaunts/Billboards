const express = require("express");
const PORT = process.env.PORT || 4000;
const app = express();

//establish middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//test API route
app.get("/api/coupons", function(req, res) {
  const coupon = { coupon: "2 for 1 Apps" };
  res.json( coupon )
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});