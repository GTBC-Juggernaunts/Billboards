const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

router.use(function(req,res) {
  res.status(404)
});

module.exports = router;