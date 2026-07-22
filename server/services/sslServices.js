const https = require("https");

async function checkSSL(url) {

    return new Promise((resolve) => {

        try {

            const parsed = new URL(url);

            if (parsed.protocol !== "https:") {

                return resolve({
                    https: false,
                    valid: false,
                    reason: "Website is not using HTTPS"
                });

            }

            const req = https.get(url, (res) => {

                const cert = res.socket.getPeerCertificate();

                if (!cert || Object.keys(cert).length === 0) {

                    return resolve({
                        https: true,
                        valid: false,
                        reason: "Certificate not found"
                    });

                }

                resolve({

                    https: true,

                    valid: true,

                    issuer: cert.issuer?.O || cert.issuer,

                    subject: cert.subject?.CN,

                    validFrom: cert.valid_from,

                    validTo: cert.valid_to,

                    serialNumber: cert.serialNumber

                });

            });

            req.on("error", (err) => {

                resolve({

                    https: true,

                    valid: false,

                    reason: err.message

                });

            });

            req.setTimeout(5000, () => {

                req.destroy();

                resolve({

                    https: true,

                    valid: false,

                    reason: "Connection timeout"

                });

            });

        }

        catch (err) {

            resolve({

                https: false,

                valid: false,

                reason: err.message

            });

        }

    });

}

module.exports = checkSSL;