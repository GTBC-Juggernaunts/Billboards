const router = require('express').Router();
const promotionController = require('../../controllers/promotionController');

// /api/promo
router
  .route('/?tag')
  .get(promotionController.findOnePromo);

router
  .route('/')
  .get(promotionController.findAllPromos)
  .post(promotionController.create);

router
  .route('/:id')
  .delete(promotionController.remove);

//

router
  .route('redeem')
  .post(promotionController.redeemPromotion);

module.exports = router;