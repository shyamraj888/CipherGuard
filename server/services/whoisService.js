const axios = require("axios");
const dotenv = require("dotenv");
require("dotenv").config();
const API_KEY = process.env.WHOIS_API_KEY;

async function checkWhois(domain) {
    try {

        const response = await axios.get(
            "https://api.whoisfreaks.com/v1.0/whois",
            {
                params: {
                    apiKey: API_KEY,
                    whois: "live",
                    domainName: domain
                }
            }
        );

        return {
            domain: response.data.domain_name,
            registrar: response.data.registrar,
            createdDate: response.data.create_date,
            expiresDate: response.data.expiry_date,
            updatedDate: response.data.updated_date
        };

    } catch (err) {

        console.log(err.response?.data || err.message);

        return null;

    }
}

module.exports = checkWhois;