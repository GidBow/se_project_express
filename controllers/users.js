const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
  FORBIDDEN,
} = require("../utils/errors");
const User = require("../models/users");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user); // Success!
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "User not found",
        });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid user ID format",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const createUser = (req, res) => {
  const { password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).send({
      message: "Email and password are required",
    });
  }

  bcryptjs
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ ...req.body, password: hashedPassword })
    )
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(CONFLICT).send({
          message: "Email already in use",
        });
      }

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid data provided",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "User not found",
        });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid user ID format",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST).send({
      message: "Incorrect email or password",
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "BAD_REQUEST") {
        return res.status(BAD_REQUEST).send({
          message: "Incorrect email or password",
        });
      }
      if (err.message === "UNAUTHORIZED") {
        return res.status(UNAUTHORIZED).send({
          message: "Incorrect email or password",
        });
      }
      if (err.message === "NOT_FOUND") {
        return res.status(NOT_FOUND).send({
          message: "User not found",
        });
      }

      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
  // Handle invalid ID format
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({
      message: "Invalid user id",
    });
  }

  // Handle user not found
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({
      message: "User not found",
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({
      message: "Invalid data provided",
    });
  }

  // Generic 500 fallback for unexpected errors
  return res.status(SERVER_ERROR).send({
    message: "An error has occurred on the server",
  });
});
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  getCurrentUser,
  login,
  updateProfile,
};
