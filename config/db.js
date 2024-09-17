const mongoose = require("mongoose");
require("dotenv").config();

async function db() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = db;
