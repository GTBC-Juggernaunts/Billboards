const mongoose = require('mongoose');
const Promotion = require('./promotion');
const User = require('./user');

const Schema = mongoose.Schema;

const RedemptionSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  PromotionId: {
    type: Schema.Types.ObjectId,
    ref: Promotion
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: User
  }

});

const Redemption = mongoose.model("Redemption", RedemptionSchema);

module.exports = Redemption;