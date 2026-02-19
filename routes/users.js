const router = require("express").Router();
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
