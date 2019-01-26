const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const BeaconSchema = new Schema({
  BeaconId: {
    type: String,
    required: true
  },
})