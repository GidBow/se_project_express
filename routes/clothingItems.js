const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  getClothingItemsById,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Get clothing item from schema
// Public route (no auth)
router.get("/", getClothingItems);

router.use(auth); // apply auth middleware to all routes below

// Protected routes (with auth)
// Get clothing item by id from schema
router.get("/:itemId", getClothingItemsById);

// add clothing items to the schema
router.post("/", createClothingItem);

// delete clothing item from schema
router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
