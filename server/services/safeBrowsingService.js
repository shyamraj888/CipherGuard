const axios = require("axios");

const API_KEY = process.env.SAFE_API_KEY;

async function checkUrl(url) {

    try {

        const response = await axios.post(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
            {
                client: {
                    clientId: "cipherguard",
                    clientVersion: "1.0"
                },
                threatInfo: {
                    threatTypes: [
                        "MALWARE",
                        "SOCIAL_ENGINEERING",
                        "UNWANTED_SOFTWARE",
                        "POTENTIALLY_HARMFUL_APPLICATION"
                    ],
                    platformTypes: [
                        "ANY_PLATFORM"
                    ],
                    threatEntryTypes: [
                        "URL"
                    ],
                    threatEntries: [
                        {
                            url: url
                        }
                    ]
                }
            }
        );

        if (response.data.matches) {

            return {
                safe: false,
                threats: response.data.matches
            };

        }

        return {
            safe: true,
            threats: []
        };

    } catch (error) {

        console.error(error.response?.data || error.message);

        return {
            safe: null,
            error: error.message
        };

    }

}

module.exports = checkUrl;