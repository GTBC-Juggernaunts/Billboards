const router = require('express').Router();
const promotionController = require('../../controllers/promotionController');

// /api/promo
router
  .route('/:tag')
  .get(promotionController.)