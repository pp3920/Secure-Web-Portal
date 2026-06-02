const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const expiration = "10h";


// Create JWT
const signToken = ({
  _id,
  username,
  email
}) => {

  return jwt.sign(
    {
      _id,
      username,
      email,
    },
    secret,
    {
      expiresIn: expiration,
    }
  );
};


// Verify JWT
const authMiddleware =
(req, res, next) => {

  let token =
    req.body.token ||
    req.query.token ||
    req.headers.authorization;

  if (req.headers.authorization) {

    token =
      token
        .split(" ")
        .pop()
        .trim();
  }

  if (!token) {

    return res.status(401).json({
      message:
        "You must be logged in.",
    });
  }

  try {

    const data =
      jwt.verify(
        token,
        secret
      );

    req.user = data;

    next();

  } catch (error) {

    return res.status(401).json({
      message:
        "Invalid or expired token.",
    });
  }
};

module.exports = {
  signToken,
  authMiddleware,
};