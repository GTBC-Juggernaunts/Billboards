const router = require('express').Router();
const promoRoutes = require("./promo");

router.use('/promo', promoRoutes);

module.exports = router;