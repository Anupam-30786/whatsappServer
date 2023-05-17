const express = require("express");
const {
  createUser,
  getChatList,
  verifyOtp,
  updateChats,
  login,
} = require("../Controller/User");

const UserRouter = express.Router();

UserRouter.get("/getChatList/:id", getChatList);
UserRouter.post("/Register", createUser);
UserRouter.post("/Register/veriFy", verifyOtp);
UserRouter.patch("/chatUpdate/:id", updateChats);
UserRouter.post("/login", login);
module.exports = UserRouter;
