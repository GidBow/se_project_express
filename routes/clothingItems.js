const router = require("express").Router();
const clothingItems = require("../models/clothingItems");

//get clothing item from schema
router.get("/items", async (req, res) => {
  try {
    const items = await clothingItems.find({});
    res.send(items);
  } catch (error) {
    res.status(500).send("Error retrieving clothing items");
  }
});

//get clothing item by id from schema
router.get("/items/:itemId", async (req, res) => {
  const item = await clothingItems.findById(req.params.itemId);
  if (!item) {
    //handles error if the clothing item doesn't exist in the schema
    res.status(404).send(`This clothing item doesn't exist`);
    return;
  }

  const { name, weather, imageUrl } = item;

  res.send(
    `Clothing item ${name}, suitable for ${weather} weather, image URL: ${imageUrl}`
  );
});

// add clothing items to the schema
router.post("/items", (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    res.send(
      "You must provide a name, weather condition, and image URL for the clothing item"
    );
    return;
  }

  const newClothingItem = {
    name,
    weather,
    imageUrl,
  };

  clothingItems.push(newClothingItem);

  res.send(`Clothing item ${name} created successfully`);
});

//delete clothing item from schema
router.delete("/items/:itemId", async (req, res) => {
  try {
    const deletedItem = await clothingItems.findByIdAndDelete(
      req.params.itemId
    );
    if (!deletedItem) {
      res.status(404).send(`This clothing item doesn't exist`);
      return;
    }
  } catch (error) {
    res.status(500).send("Error deleting clothing item");
  }

  const deletedItem = clothingItems.splice(req.params.itemId, 1);

  res.send(`Clothing item ${deletedItem[0].name} deleted successfully`);
});

module.exports = router;
