const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.VT_API_KEY;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkVirusTotal(url) {

    try {

        // STEP 1: Submit URL
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

        // STEP 2: Wait until analysis completes
        let completed = false;

        for (let i = 0; i < 15; i++) {

            await sleep(2000);

            const analysisResponse = await axios.get(
                `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
                {
                    headers: {
                        "x-apikey": API_KEY
                    }
                }
            );

            if (
                analysisResponse.data.data.attributes.status ===
                "completed"
            ) {
                completed = true;
                break;
            }
        }

        if (!completed) {

            return {
                error: true,
                message: "VirusTotal analysis timeout."
            };

        }

        // STEP 3: Create URL ID
        const urlId = Buffer
            .from(url)
            .toString("base64")
            .replace(/=/g, "");

        // STEP 4: Fetch permanent URL report
        const reportResponse = await axios.get(
            `https://www.virustotal.com/api/v3/urls/${urlId}`,
            {
                headers: {
                    "x-apikey": API_KEY
                }
            }
        );

        const stats =
            reportResponse.data.data.attributes.last_analysis_stats;

        return {

            malicious: stats.malicious || 0,

            suspicious: stats.suspicious || 0,

            harmless: stats.harmless || 0,

            undetected: stats.undetected || 0,

            timeout: stats.timeout || 0,

            reputation:
                reportResponse.data.data.attributes.reputation || 0,

            categories:
                reportResponse.data.data.attributes.categories || {},

            lastAnalysisDate:
                reportResponse.data.data.attributes.last_analysis_date

        };

    }

    catch (err) {

        console.log(
            "VirusTotal Error:",
            err.response?.data || err.message
        );

        return {

            error: true,

            message: err.response?.data || err.message

        };

    }

}

module.exports = checkVirusTotal;