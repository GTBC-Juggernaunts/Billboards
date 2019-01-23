const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  Deal: {
    type: String,
    required: true
  },
  ActiveZones: {

  }
};

const Promotion = mongoose.model("Promotion", PromotionSchema);

module.exports = Promotion;