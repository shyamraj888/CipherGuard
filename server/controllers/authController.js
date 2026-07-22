const User = require("../models/User");
const bcrypt = require("bcryptjs");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const sendOTPEmail = require("../services/emailService");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists."
            });

        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({

            name,

            email,

            password: hashedPassword

        });

        res.status(201).json({

            success: true,

            message: "User created successfully.",

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

const sendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Email is required."
            });

        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists. Please login."
            });

        }

        // Generate OTP
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        // Delete previous OTPs
        await OTP.deleteMany({ email });

        // Save new OTP
        await OTP.create({

            email,

            otp,

            expiresAt: new Date(Date.now() + 5 * 60 * 1000)

        });

        // Send Email
        await sendOTPEmail(email, otp);

        return res.status(200).json({

            success: true,

            message: "OTP sent successfully."

        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Failed to send OTP."

        });

    }

};


const verifyOTP = async (req, res) => {

    try {

        const { name, email, password, otp } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !otp) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }
// Find OTP for this email
const otpRecord = await OTP.findOne({ email });

if (!otpRecord) {

    return res.status(400).json({

        success: false,

        message: "OTP not found."

    });

}

console.log(otpRecord);

return res.status(200).json({

    success: true,

    message: "OTP Found."

});

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};
module.exports = {
    signup,
    sendOTP,
    verifyOTP
};