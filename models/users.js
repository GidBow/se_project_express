const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    // every user has a name field, the requirements for which are described below:
    type: String,
    required: true, // every user has a name, so it's a required field
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String, // the avatar is a string (URL or path to image)
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
