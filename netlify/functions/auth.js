
const USERNAME = process.env.BASIC_AUTH_USERNAME;
const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

exports.handler = async (event) => {
  const { headers } = event;
  const auth = headers.authorization;

  if (!auth) {
    return {
      statusCode: 401,
      headers: {
        "WWW-Authenticate": "Basic realm=\"Secure Area\"",
      },
    };
  }

  const [username, password] = Buffer.from(auth.split(" ")[1], "base64").toString().split(":");

  if (username === USERNAME && password === PASSWORD) {
    return {
      statusCode: 200,
      headers: {
        "x-nf-pass": "true",
      },
    };
  }

  return {
    statusCode: 401,
    headers: {
      "WWW-Authenticate": "Basic realm=\"Secure Area\"",
    },
  };
};

