const router = require("express").Router();
const users = require("../models/users");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

router.get("/users", async (req, res) => {
  try {
    const user = await users.find({});
    res.send(user);
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
});

router.get("/users/:userId", async (req, res) => {
  const user = await users.findById(req.params.userId);
  const { name, avatar } = user;

  res.send(`User ${name}, avatar: ${avatar}`);
  if (!user) {
    return res.status(NOT_FOUND).send("User not found");
  }
});

router.post("/users", async (req, res) => {
  const { name, avatar } = req.body;

  if (!name || !avatar) {
    res.send("You must provide a name and avatar for the user");
    return;
  }

  const newUser = {
    name,
    avatar,
  };

  const createdUser = await users.create(newUser);

  res.send(`User ${createdUser.name} created successfully`);
});

module.exports = router;
