const express = require("express");
require("./dbConnection");
const { json } = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const UserRouter = require("./Route/userRoute");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", UserRouter);=

app.listen(9090, () => {
  console.log("listning on 9090");
});
