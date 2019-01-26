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
    required: true
  },
  Salt: {
    type: String,
    required: true
  },
  // this will be later replaced by an array of tags
  PreferenceTag: {
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