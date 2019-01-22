const router = require('express').Router();
const couponRoutes = require("./coupons");

router.use('/coupons', couponRoutes);

module.exports = router;