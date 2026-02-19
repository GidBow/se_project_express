const router = require("express").Router();
const users = require("../models/users");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");
const {
  getUsers,
  getUsersById,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

router.get("/users", getUsers);

router.get("/users/:userId", getUsersById);

router.post("/users", createUser);

router.put("/users/:userId", updateUser);

router.delete("/users/:userId", deleteUser);

module.exports = router;
