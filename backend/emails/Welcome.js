const React = require("react");
const {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Section,
  Hr,
} = require("@react-email/components");

function Welcome({ userFirstname }) {
  return React.createElement(Html, null,
    React.createElement(Head, null),
    React.createElement(Body, { style: main },
      React.createElement(Container, { style: container },
        React.createElement(Text, { style: paragraph }, `Hi ${userFirstname},`),
        React.createElement(Text, { style: paragraph },
          "Welcome to Natours, we promise that you will have a great experience here!"
        ),
        React.createElement(Section, { style: btnContainer },
          React.createElement(Button, { style: button, href: "http://localhost:5173" }, "Get Started")
        ),
        React.createElement(Text, { style: paragraph }, "Best,\nThe Natours Team"),
        React.createElement(Hr, { style: hr })
      )
    )
  );
}

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

module.exports = Welcome;
