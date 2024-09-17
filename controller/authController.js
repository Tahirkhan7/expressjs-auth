const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const users = require("../model/userModel");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = bcryptjs.hash(password, 10);

  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(400).json({ message: "User doesn't exists!" });
  }

  const isMatch = bcryptjs.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials!" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

exports.protected = (req, res) => {
  res.json({ message: `Welcome ${req.username}, you are authorized. ` });
};
