const { mongoose, Schema } = require("mongoose");

const UserSchema = new Schema({
  Name: String,
  PhoneNumber: Number,
  email: String,
  Profilepic: String,
  chats: [],
});
const newUserModel = mongoose.model("userlist", UserSchema);
module.exports = newUserModel;
