const router = require("express").Router(); // Create a new router instance

const {
  getUsers,
  getUsersById,
  createUser,
  deleteUser,
} = require("../controllers/users");


router.delete("/:userId", deleteUser);

module.exports = router;
