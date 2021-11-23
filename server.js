const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const db = require("./db");

db.connectdb();

//listening to the port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
