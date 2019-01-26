const mongoose = require("mongoose");
const Beacon = require('./beacon');


const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  PromotionText: {
    type: String,
    required: true
  },
  BeaconTag: {
   type: String,
   required: true
  },
  PreferenceGroup: {
    type: String,
    required: true
  },
  ExpirationDate: {
    type: Date,
    required: false
  }
});

const Promotion = mongoose.model("Promotion", PromotionSchema);

module.exports = Promotion;