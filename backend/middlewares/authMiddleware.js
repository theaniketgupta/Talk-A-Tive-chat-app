const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password"); // Finding the user without the password property.

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized.");
    }
  }
});

module.exports = { auth };
