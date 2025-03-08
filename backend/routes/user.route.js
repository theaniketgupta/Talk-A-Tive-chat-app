const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/user.controller");
const {auth}=require("../middlewares/authMiddleware")
const router = express.Router();

router.route('/').post(registerUser).get(auth,getAllUsers);
router.post('/login',loginUser);

module.exports = router;
