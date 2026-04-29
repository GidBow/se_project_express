const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
} = require("../utils/errors");
const clothingItems = require("../models/clothingItems");

const getClothingItems = (req, res) => {
  clothingItems
    .find({})
    .then((items) => res.send(items))
    .catch(
      res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      })
    );
};

const getClothingItemsById = (req, res) => {
  clothingItems
    .findById(req.params.itemId)
    .orFail()
    .then((item) => {
      res.send(item); // Success!
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Clothing item not found",
        });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid item ID format",
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
    .create({ ...req.body, owner: req.user._id })
    .then((item) => {
      res.status(201).send(item); // Success!
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid data provided",
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
    .findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status(FORBIDDEN).send({
          message: "You do not have permission to delete this item",
        });
      }
      return clothingItems.findByIdAndDelete(req.params.itemId);
    })
    .then((item) => {
      res.send({ item }); // Success!
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Clothing item not found",
        });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid item ID format",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const likeItem = (req, res) =>
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } }, // Add user ID if not already there
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Clothing item not found",
        });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid item ID format",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });

const dislikeItem = (req, res) =>
  clothingItems
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } }, // Remove user ID from array
      { new: true }
    )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({
          message: "Clothing item not found",
        });
      }

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid item ID format",
        });
      }

      // Default to server error
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });

module.exports = {
  getClothingItems,
  getClothingItemsById,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
