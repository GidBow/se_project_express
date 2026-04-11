const bcryptjs = require("bcryptjs");
const {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  SERVER_ERROR,
} = require("../utils/errors");
const User = require("../models/users");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users); // Success!
    })
    .catch((err) => {
      console.error(err); // Always log the error first!

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user); // Success!
    })
    .catch((err) => {
      console.error(err); // Always log the error first!

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
  const { email, password } = req.body;

  bcryptjs
    .hash(password, 10)
    .then((hashedPassword) => {
      return User.create({
        ...req.body,
        password: hashedPassword,
      });
    })
    .then((user) => {
      res.status(201).send(user); // Success!
    })
    .catch((err) => {
      console.error(err); // Always log the error first!

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
      console.error(err);

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

module.exports = { createUser, deleteUser, getUsers, getUsersById };
