const router = require("express").Router();

const {
  getClothingItems,
  getClothingItemsById,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// get clothing item from schema
router.get("/", getClothingItems);

// get clothing item by id from schema
router.get("/:itemId", getClothingItemsById);

// add clothing items to the schema
router.post("/", createClothingItem);

// delete clothing item from schema
router.delete("/:itemId", deleteClothingItem);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
