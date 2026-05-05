const router = require("express").Router(); // Create a new router instance

const {
  getUsers,
  getCurrentUser,
  createUser,
  deleteUser,
  updateProfile,
} = require("../controllers/users");

router.get("/me", getCurrentUser);
router.delete("/:userId", deleteUser);
router.patch("/me", updateProfile);
router.post("/", createUser);
router.get("/", getUsers);


module.exports = router;
