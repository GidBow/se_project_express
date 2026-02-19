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
router.get("/items", getClothingItems);

// get clothing item by id from schema
router.get("/items/:itemId", getClothingItemsById);

// add clothing items to the schema
router.post("/items", createClothingItem);

// delete clothing item from schema
router.delete("/items/:itemId", deleteClothingItem);

router.put("/items/:itemId/likes", likeItem);

router.delete("/items/:itemId/likes", dislikeItem);

module.exports = router;
