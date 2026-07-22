function calculateRisk({
    url,
    keywords = [],
    safeBrowsing = {},
    virusTotal = {},
    whois = {},
    ssl = {}
}) {

    let score = 0;

    const positives = [];
    const warnings = [];

    // =============================
    // Keyword Analysis
    // =============================

    const keywordWeights = {
        otp: 5,
        password: 10,
        login: 8,
        verify: 8,
        account: 6,
        bank: 10,
        payment: 10,
        fee: 12,
        urgent: 8,
        prize: 8,
        reward: 6,
        bitcoin: 12,
        crypto: 10,
        investment: 8,
        internship: 4,
        amazon: 2
    };

    let keywordScore = 0;

    for (const word of keywords) {
        keywordScore += keywordWeights[word.toLowerCase()] || 3;
    }

    keywordScore = Math.min(keywordScore, 25);

    if (keywordScore > 0) {
        score += keywordScore;
        warnings.push(
            `${keywords.length} suspicious keyword(s) detected (+${keywordScore})`
        );
    } else {
        positives.push("No suspicious keywords detected");
    }

    // =============================
    // Google Safe Browsing
    // =============================

    if (safeBrowsing.safe === false) {

        score += 50;

        warnings.push(
            "Google Safe Browsing identified this URL as unsafe (+50)"
        );

    } else {

        positives.push("Google Safe Browsing reports the URL as safe");

    }

    // =============================
    // VirusTotal
    // =============================

    if (!virusTotal.error) {

        const malicious = virusTotal.malicious || 0;

        if (malicious >= 20) {

            score += 40;

            warnings.push(
                `${malicious} security vendors flagged this URL (+40)`
            );

        }

        else if (malicious >= 10) {

            score += 30;

            warnings.push(
                `${malicious} security vendors flagged this URL (+30)`
            );

        }

        else if (malicious >= 5) {

            score += 20;

            warnings.push(
                `${malicious} security vendors flagged this URL (+20)`
            );

        }

        else if (malicious >= 1) {

            score += 10;

            warnings.push(
                `${malicious} security vendor(s) flagged this URL (+10)`
            );

        }

        else {

            positives.push(
                "VirusTotal reported no malicious detections"
            );

        }

    }

    // =============================
    // WHOIS Domain Age
    // =============================

    if (whois?.createdDate) {

        const ageDays = Math.floor(

            (Date.now() - new Date(whois.createdDate))

            /

            (1000 * 60 * 60 * 24)

        );

        if (ageDays < 3) {

            score += 35;

            warnings.push(
                "Domain registered within the last 3 days (+35)"
            );

        }

        else if (ageDays < 7) {

            score += 30;

            warnings.push(
                "Domain registered within the last week (+30)"
            );

        }

        else if (ageDays < 30) {

            score += 20;

            warnings.push(
                "Recently registered domain (+20)"
            );

        }

        else if (ageDays < 180) {

            score += 10;

            warnings.push(
                "Domain is less than 6 months old (+10)"
            );

        }

        else {

            positives.push(
                `Domain has existed for ${ageDays} days`
            );

        }

    }

    // =============================
    // SSL
    // =============================

    if (!ssl.https) {

        score += 20;

        warnings.push(
            "Website does not use HTTPS (+20)"
        );

    }

    else if (!ssl.valid) {

        score += 10;

        warnings.push(
            "SSL certificate is invalid (+10)"
        );

    }

    else {

        positives.push(
            "Valid HTTPS certificate detected"
        );

    }

    // =============================
    // Suspicious URL Structure
    // =============================

    if (url) {

        try {

            const parsed = new URL(url);

            const hostname = parsed.hostname;

            const dashCount = (hostname.match(/-/g) || []).length;

            if (dashCount >= 3) {

                score += 8;

                warnings.push(
                    "Hostname contains many hyphens (+8)"
                );

            }

            if (hostname.split(".").length >= 5) {

                score += 10;

                warnings.push(
                    "Hostname contains excessive subdomains (+10)"
                );

            }

        } catch (err) {}

    }

    // =============================
    // Final Score
    // =============================

    score = Math.min(score, 100);

    let level = "SAFE";

    if (score >= 80)
        level = "CRITICAL";

    else if (score >= 60)
        level = "HIGH";

    else if (score >= 40)
        level = "MEDIUM";

    else if (score >= 20)
        level = "LOW";

    const confidence =
        score >= 80
            ? "Very High"
            : score >= 60
            ? "High"
            : score >= 40
            ? "Medium"
            : "Low";

    const reasons = [...warnings, ...positives];

    return {

        score,

        level,

        confidence,

        positives,

        warnings,

        reasons

    };

}

module.exports = calculateRisk;