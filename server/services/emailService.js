const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

const sendOTPEmail = async (email, otp) => {

    try {

        await transporter.sendMail({

            from: `"CipherGuard Security" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "Your CipherGuard Verification Code",

            html: `
                <div style="font-family:Arial;padding:20px">

                    <h2>Welcome to CipherGuard 🛡️</h2>

                    <p>Your verification code is:</p>

                    <h1 style="letter-spacing:5px;color:#2563eb;">
                        ${otp}
                    </h1>

                    <p>This OTP is valid for <b>5 minutes</b>.</p>

                    <p>If you didn't request this, ignore this email.</p>

                </div>
            `

        });

        console.log("✅ OTP Email Sent");

    }

    catch(err){

        console.log(err);

        throw err;

    }

};

module.exports = sendOTPEmail;