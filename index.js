const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoute");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
