const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");
const token = authorization.replace("Bearer ", "");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");

  if (!authorization) {
    return res.status(UNAUTHORIZED).send({
      message: "Authorization header is missing",
    });
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(UNAUTHORIZED).send({
      message: "Invalid token",
    });
  }

  req.user = payload;
  next();
};

module.exports = auth;
