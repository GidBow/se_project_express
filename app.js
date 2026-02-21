const express = require("express");
const mongoose = require("mongoose");
const { NOT_FOUND } = require("./utils/errors");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "698e6534f32e05800403030d",
  };
  next();
});

const routes = require("./routes");
app.use(routes);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
