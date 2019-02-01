const mongoose = require("mongoose");
const Promotion = require("./promotion");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Phone: {
    type: Number,
    required: true
  },
  HashedPassword: {
    type: String,
    required: false
  },
  Salt: {
    type: String,
    required: false
  },
  // this will be later replaced by an array of tags
  PreferenceGroup: {
    type: String,
    required: true
  },
  // array of coupons redeemed by user
  CouponsRedeemed: [
    {
      type: Schema.Types.ObjectId,
      ref: Promotion
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;