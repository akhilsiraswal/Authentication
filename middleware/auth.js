const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //get the token from the header if present...

  const token = req.headers["x-access-token"] || req.headers["authorization"];

  // if no token found, return response (without going to the next middleware);

  if (!token) return res.status(401).send("Access denied!");

  try {
    const decoded = jwt.verify(token, config.get("myprivatekey"));

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token!");
  }
};
