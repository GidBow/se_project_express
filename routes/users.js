const router = require("express").Router(); // Create a new router instance

const {
  getUsers,
  getUsersById,
  createUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", getUsersById);

router.post("/", createUser);

router.delete("/:userId", deleteUser);

module.exports = router;
