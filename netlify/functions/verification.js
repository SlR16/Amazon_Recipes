// /netlify/functions/check-passcode.js
const passcode = process.env.PASSCODE;

exports.handler = async (event, context) => {
  const { passcodeInput } = JSON.parse(event.body); // Get the passcode input from the client

  if (passcodeInput === passcode) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Access granted!" }),
    };
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Access denied. Invalid passcode." }),
    };
  }
};
