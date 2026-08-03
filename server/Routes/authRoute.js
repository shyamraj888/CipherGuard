const express = require("express");

const router = express.Router();

const {
    signup,
    sendOTP,
    verifyOTP,
    login,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

module.exports = router;