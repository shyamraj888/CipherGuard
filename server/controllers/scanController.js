const Tesseract = require("tesseract.js");
const extractUrls = require("../utils/extractUrls");
const keywordChecker = require("../utils/keywordcheck");
const checkUrl = require("../services/safeBrowsingService");
const checkVirusTotal = require("../services/virusTotalService");
const checkWhois = require("../services/whoisService");
const checkSSL = require("../services/sslServices");
const calculateRisk = require("../services/riskCalculator");
const { parse } = require("tldts");

const scanController = async (req, res) => {
    try {

        console.log("BODY:");
        console.log(req.body);

        console.log("FILES:");
        console.log(req.files);

        let text = "";
        let inputType = "";

        // =========================
        // URL
        // =========================
        if (req.body.url) {
            text = req.body.url;
            inputType = "url";
        }

        // =========================
        // WhatsApp Message
        // =========================
        else if (req.body.message) {
            text = req.body.message;
            inputType = "message";
        }

        // =========================
        // Email Text
        // =========================
        else if (req.body.emailText) {
            text = req.body.emailText;
            inputType = "email-text";
        }

        // =========================
        // Email File (.eml)
        // =========================
        else if (req.files?.emailFile) {

            // Later you'll parse the .eml file
            text = "Email file uploaded.";
            inputType = "email-file";

        }

        // =========================
        // Image OCR
        // =========================
        else if (req.files?.image) {

            const image = req.files.image[0];

            console.log("Running OCR...");

            const result = await Tesseract.recognize(
                image.path,
                "eng"
            );

            text = result.data.text;
            inputType = "image";

            console.log("OCR Finished");
            console.log(text);
        }

        else {
            return res.status(400).json({
                success: false,
                message: "Nothing received."
            });
        }

        // =====================================
        // STEP 1 : Extract URLs
        // =====================================

        const urls = extractUrls(text);
        let safeBrowsingResults = [];

for (const url of urls) {

    const result = await checkUrl(url);

    safeBrowsingResults.push({
        url,
        ...result
    });

}

const virusTotalResults = [];

for (const url of urls) {

    const result = await checkVirusTotal(url);

    virusTotalResults.push({
        url,
        ...result
    });

}

const WhoisResults = [];

for (const url of urls) {
    const domain = parse(url).domain;

    const final = await checkWhois(domain);

    WhoisResults.push({
        url,
        ...final
    });

}

const sslResults = [];

for (const url of urls) {

    const ssl = await checkSSL(url);

    sslResults.push({

        url,

        ...ssl

    });

}
console.log("SSL Results:");
console.log(sslResults);
  
  

    
        const detectedKeywords = keywordChecker(text);

console.log(detectedKeywords);

        console.log("Extracted URLs:");
        console.log(urls);

        // =====================================
        // STEP 2 : Keyword Detection
        // (Coming Next)
        // =====================================

        // const keywords = keywordChecker(text);

        // =====================================
        // STEP 3 : VirusTotal
        // (Coming Next)
        // =====================================

        // =====================================
        // STEP 4 : Google Safe Browsing
        // (Coming Next)
        // =====================================
let riskReports = [];

for (let i = 0; i < urls.length; i++) {

    const report = calculateRisk({

        url: urls[i],

        keywords: detectedKeywords,

        safeBrowsing: safeBrowsingResults[i],

        virusTotal: virusTotalResults[i],

        whois: WhoisResults[i],

        ssl: sslResults[i]

    });

    riskReports.push({

        url: urls[i],

        ...report

    });
    console.log("Risk Report for URL:", urls[i]);
    console.log(report);

}
        // =====================================
        // STEP 5 : Gemini AI
        // (Coming Next)
        // =====================================

        return res.json({
            success: true,
            type: inputType,
            extractedText: text,
            extractedUrls: urls,
            detectedKeywords: detectedKeywords,
            safeBrowsingResults: safeBrowsingResults,
            virusTotalResults: virusTotalResults,
            WhoisResults: WhoisResults,
            sslResults: sslResults,
            riskReports: riskReports

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