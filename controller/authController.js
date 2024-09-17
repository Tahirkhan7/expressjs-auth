const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../model/userModel");
require("dotenv").config();
const db = require("../config/db");

db()
  .then()
  .catch((err) => console.log(err));

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username: username });
  if (userExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = bcryptjs.hash(password, 10);

  User.create({
    username: username,
    password: (await hashedPassword).toString(),
  })
    .then((data) => {
      res.status(200).json({ message: "User registered successfully", data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

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
  console.log(req)
  res.status(200).json({ message: `Welcome ${req.username}, you are authorized. ` });
};
