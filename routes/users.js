const router = require("express").Router(); // Create a new router instance

const { getCurrentUser, updateProfile } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);

module.exports = router;
