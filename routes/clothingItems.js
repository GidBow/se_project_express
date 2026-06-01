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


// Protected routes (with auth)
// Get clothing item by id from schema
router.get("/:itemId", getClothingItemsById);

// Add clothing items to the schema
router.post("/", createClothingItem);

// Delete clothing item from schema
router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
