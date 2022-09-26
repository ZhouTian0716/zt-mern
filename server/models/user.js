const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    name: { type: String, required:  true },
    email: {
      type: String,
      required: true,
      index: true,
      // unique: true,
      // match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart:{
      type: Array,
      default: [],
    },
    address: String,
    // wishlist:[{
    //   type: ObjectId,
    //   ref:"Product"
    // }],
  }, 
  {timestamps:true}
);

module.exports = mongoose.model("User", userSchema);
