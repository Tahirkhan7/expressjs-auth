const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
