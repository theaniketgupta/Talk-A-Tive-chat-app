const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/user.controller");
const { auth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(auth, getAllUsers);
router.route("/login").post(loginUser);

module.exports = router;
