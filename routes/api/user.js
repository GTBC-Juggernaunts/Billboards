const router = require('express').Router();
const userController = require('../../controllers/userController');

// /api/user
router
  .route('/')
  .post(userController.create);

router
  .route('/:id')
  .get(userController.findUserById)
  .delete(userController.remove);

module.exports = router;