const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    // clothing item name
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    // assigned weather condition for the clothing item
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"], // enum validator to ensure the weather field can only be one of the specified values
  },
  imageUrl: {
    type: String, // string because typing in the image URL
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // this is a full explicit path to objectId
    required: true,
    ref: "User", // ref- this is how we establish the relationship between clothing items and users.
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [], // empty array to start since hasn't been liked yet.
    ref: "user",
  },
  createdAt: {
    // timestamp for when the clothing item was created
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
