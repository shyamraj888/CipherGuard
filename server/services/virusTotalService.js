const axios = require("axios");
const dotenv = require("dotenv");
require("dotenv").config();
const API_KEY = process.env.VT_API_KEY;

async function checkVirusTotal(url) {
    try {

        // STEP 1: Submit URL
        console.log("VT API KEY:", process.env.VT_API_KEY);
        const submitResponse = await axios.post(
            "https://www.virustotal.com/api/v3/urls",
            new URLSearchParams({
                url: url
            }),
            {
                headers: {
                    "x-apikey": API_KEY,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const analysisId = submitResponse.data.data.id;

        // Wait for analysis
        await new Promise(resolve => setTimeout(resolve, 2000));

        // STEP 2: Get Result
        const analysisResponse = await axios.get(
            `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
            {
                headers: {
                    "x-apikey": API_KEY
                }
            }
        );

        const stats = analysisResponse.data.data.attributes.stats;

        return {
            malicious: stats.malicious,
            suspicious: stats.suspicious,
            harmless: stats.harmless,
            undetected: stats.undetected
        };

    } catch (err) {

        console.log("VirusTotal Error:", err.response?.data || err.message);

        return {
            error: true,
            message: err.message
        };

    }
}

module.exports = checkVirusTotal;