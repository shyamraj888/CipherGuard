const axios = require("axios");

const getCyberNews = async () => {

    const response = await axios.get(
        "https://newsapi.org/v2/everything",
        {
            params: {
                q: '("UPI scam" OR "bank fraud" OR phishing OR "QR code scam" OR "WhatsApp scam" OR "OTP scam" OR "cybercrime" OR "online fraud")',
                language: "en",
                sortBy: "publishedAt",
                pageSize: 20,
                apiKey: process.env.NEWS_URL,
            }
        }
    );

    return response.data.articles;
}

module.exports = {
    getCyberNews
}