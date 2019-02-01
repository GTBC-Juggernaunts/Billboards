const router = require('express').Router();
const promoRoutes = require("./promo");
const userRoutes = require("./user");

router.use('/promo', promoRoutes);
router.use('/user', userRoutes);

module.exports = router;