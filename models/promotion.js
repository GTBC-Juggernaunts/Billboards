const mongoose = require("mongoose");
const Beacon = require('./beacon');


const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  Deal: {
    type: String,
    required: true
  },
  ActiveBeacons: [
    {
    type: Schema.Types.ObjectId,
    ref: Beacon
    }
  ],
  PreferenceTag: {
    type: String,
    required: true
  },
  ExpirationDate: {
    type: Date,
    required: true
  }
});

const Promotion = mongoose.model("Promotion", PromotionSchema);

module.exports = Promotion;