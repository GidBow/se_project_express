const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const getClothingItems = (req, res) => {
  clothingItems
    .find({})
    .then((items) => {
      res.send(items); // Success!
    })
    .catch((err) => {
      console.error(err); // Always log the error first!

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid data provided",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Clothing item not found",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const createClothingItem = (req, res) => {
  clothingItems
    .create(req.body)
    .then((item) => {
      res.send(item); // Success!
    })
    .catch((err) => {
      console.error(err); // Always log the error first!

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid data provided",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Clothing item not found",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const deleteClothingItem = (req, res) => {
  clothingItems
    .findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) => {
      res.send({ message: "Clothing item deleted successfully" }); // Success!
    })
    .catch((err) => {
      console.error(err); // Always log the error first!

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid data provided",
        });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Clothing item not found",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
};
