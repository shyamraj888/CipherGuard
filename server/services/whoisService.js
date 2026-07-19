const axios = require("axios");

const API_KEY = process.env.WHOIS_API_KEY;

async function checkWhois(domain) {

    try {

        const response = await axios.get(
            "https://www.whoisxmlapi.com/whoisserver/WhoisService",
            {
                params: {
                    apiKey: API_KEY,
                    domainName: domain,
                    outputFormat: "JSON"
                }
            }
        );

        const whois = response.data.WhoisRecord;

        return {

            domain: whois.domainName,

            registrar: whois.registrarName,

            createdDate: whois.createdDate,

            expiresDate: whois.expiresDate,

            updatedDate: whois.updatedDate

        };

    }

    catch(err){

        console.log(err.response?.data || err.message);

        return null;

    }

}

module.exports = checkWhois;