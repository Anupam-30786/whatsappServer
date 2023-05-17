const newUserModel = require("../model/userModel");
const { sendOtp, otpGenerate } = require("./email");
var otp;

const getChatList = async (req, res) => {
  const { id } = req.params;
  console.log("id is", id);
  try {
    console.log(id);
    const data = await newUserModel.findOne({ PhoneNumber: id });
    console.log("getdata is", data);
    if (data) res.status(200).send(data);
    else {
      res.send({ isvalid: false });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const createUser = async (req, res) => {
  const body = req.body;
  let result = body;
  console.log(body);

  try {
    if (
      (result = await newUserModel.find({ PhoneNumber: body.PhoneNumber }))
        .length > 0
    ) {
      res.send({
        err: "user already exits please try with different mobile number",
      });
    } else {
      otp = otpGenerate();

      sendOtp(body, otp, res);
    }
  } catch (e) {
    console.log(e);
  }
};
const verifyOtp = async (req, res) => {
  const userOtp = req.body.otp;
  const isNewUser = req.body.isNewUser;
  console.log("is newUser", userOtp);
  if (otp == userOtp && isNewUser === true) {
    const result = await newUserModel.create(req.body);
    console.log(result);
    res.send(result);
  } else if (otp == userOtp && isNewUser === false) {
    const result = await newUserModel.findOne({
      PhoneNumber: req.body.PhoneNumber,
    });
    console.log("new otp result is", result);
    res.send(result);
  } else {
    res.send({ isTrue: false });
  }
};

const updateChats = async (req, res) => {
  const { id } = req.params;
  console.log("number is", id);
  try {
    const updateValue = await newUserModel.updateOne(
      { PhoneNumber: id },
      { $push: { chats: req.body } }
    );

    if (updateValue.acknowledged) {
      const data = await newUserModel.findOne({ PhoneNumber: id });
      console.log("updated data is", data);
      res.send(data);
      console.log("djjslkdaa", data);
    }
  } catch (err) {
    res.send(err);
  }
};

const login = async (req, res) => {
  const body = req.body;
  const data = await newUserModel.findOne({ PhoneNumber: body.PhoneNumber });
  if (data) {
    otp = otpGenerate();
    sendOtp(body, otp, res);
  } else {
    res.send({
      err: "user is not registered with whatsapp please signup first",
    });
  }
};
module.exports = { createUser, getChatList, verifyOtp, updateChats, login };
