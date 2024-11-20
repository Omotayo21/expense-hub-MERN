const jwt = require("jsonwebtoken");

exports.getTokenData = (req) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Get token after "Bearer"
    if (!token) throw new Error("Token not provided");

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
