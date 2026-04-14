const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("No token provided");
  }

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    req.user = decoded; // attach user data
    next();
  });
};

module.exports = verifyToken;