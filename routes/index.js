const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

// Public routes (no authentication required)
router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", clothingItemRouter);

// Apply auth middleware to protected routes below
router.use(auth);

// Protected routes
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
