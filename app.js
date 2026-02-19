const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());

const clothingItemsRouter = require("./routes/clothingItems");
const usersRouter = require("./routes/users");

app.use((req, res, next) => {
  req.user = {
    _id: "698e6534f32e05800403030d",
  };
  next();
});

app.use(clothingItemsRouter);
app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
