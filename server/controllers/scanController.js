const Tesseract = require("tesseract.js");

const scanController = async (req, res) => {

    try {

        console.log("BODY:");
        console.log(req.body);

        console.log("FILES:");
        console.log(req.files);

        // URL
        if (req.body.url) {

            return res.json({
                success: true,
                type: "url",
                data: req.body.url
            });

        }

        // WhatsApp Message
        if (req.body.message) {

            return res.json({
                success: true,
                type: "message",
                data: req.body.message
            });

        }

        // Email Text
        if (req.body.emailText) {

            return res.json({
                success: true,
                type: "email-text",
                data: req.body.emailText
            });

        }

        // Email File
        if (req.files && req.files.emailFile) {

            return res.json({
                success: true,
                type: "email-file",
                file: req.files.emailFile[0]
            });

        }

        // Image OCR
        if (req.files && req.files.image) {

            const image = req.files.image[0];

            const result = await Tesseract.recognize(
                image.path,
                "eng"
            );

            return res.json({

                success: true,

                type: "image",

                extractedText: result.data.text

            });

        }

        return res.status(400).json({
            success: false,
            message: "Nothing received."
        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = {
    scanController
};