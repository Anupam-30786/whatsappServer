var nodemailer = require("nodemailer");

function sendOtp(body, otp, res) {
  console.log(body.email);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "anupamsingh345.sne@gmail.com",
      pass: "wopxqvmowswuwhwl",
    },
  });

  var mailOptions = {
    from: "anupamsingh345.sne@gmail.com",
    to: body.email,
    subject: "WhatsApp demo Registration",
    text: `your otp for whatsApp registration is ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send(error);
      return "error";
    } else {
      res.send({ ...body, otp });
    }
  });
}

function otpGenerate() {
  let otp = Math.ceil(Math.random() * 10000);
  return otp;
}
module.exports = { sendOtp, otpGenerate };
