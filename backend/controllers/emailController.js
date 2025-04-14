const { Resend } = require("resend");
const AppError = require("../utils/error");
const Welcome = require("../emails/Welcome");
const React = require("react");
const { render } = require("@react-email/render");
const resendKey = process.env.RESEND_API_KEY;

const resend = new Resend(resendKey);

exports.welcomeEmail = async (req, res, next) => {
  try {
    const {email,name} = req.body
    const html = await render(React.createElement(Welcome, { userFirstname: name }));
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["agarwalyashhh004@gmail.com"], // replace with email
      subject: "Welcome to Natours!",
      html,
    });
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    next(new AppError(err.message, 400, err));
  }
};
