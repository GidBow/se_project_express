const mongoose = require("mongoose");
const validator = require("validator");
  const bcrypt = require("bcryptjs");

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
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // by default, the password field will not be returned in queries
  },
});


 userSchema.statics.findUserByCredentials = function (email, password) {
  const User = this;

  return User.findOne({ email }).select("+password").then((user) => {
    if (!user) {
      return Promise.reject(new Error("Unauthorized"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Unauthorized"));
      }

      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
