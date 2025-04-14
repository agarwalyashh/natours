const React = require("react");
const {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Section,
  Preview,
  Hr,
} = require("@react-email/components");

function forgotPassword({ userFirstname, resetPasswordLink }) {
  return React.createElement(
    Html,
    null,
    React.createElement(Head, null),
    React.createElement(
      Body,
      { style: main },
      React.createElement(Preview, null, "Natours reset your password"),
      React.createElement(
        Container,
        { style: container },
        React.createElement(Text, { style: paragraph }, `Hi ${userFirstname},`),
        React.createElement(
          Text,
          { style: paragraph },
          "Someone recently requested a password change for your Natours account. If this was you, you can set a new password here:"
        ),
        React.createElement(
          Section,
          { style: btnContainer },
          React.createElement(
            Button,
            { style: button, href: resetPasswordLink },
            "Reset password"
          )
        ),
        React.createElement(
          Text,
          { style: paragraph },
          "If you don't want to change your password or didn't request this, just ignore and delete this message."
        ),
        React.createElement(
          Text,
          { style: paragraph },
          "Best,\nThe Natours Team"
        ),
        React.createElement(Hr, { style: hr })
      )
    )
  );
}

module.exports = forgotPassword;

// ---- Styles ----

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = { margin: "0 auto", padding: "20px 0 48px" };

const paragraph = { fontSize: "16px", lineHeight: "26px" };

const btnContainer = { textAlign: "center" };

const button = {
  backgroundColor: "#55c57c",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = { borderColor: "#cccccc", margin: "20px 0" };
