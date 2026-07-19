const keywords = [
    "urgent",
    "verify",
    "verification",
    "login",
    "password",
    "otp",
    "bank",
    "account",
    "kyc",
    "payment",
    "pay",
    "upi",
    "reward",
    "prize",
    "winner",
    "claim",
    "gift",
    "click here",
    "limited time",
    "update account",
    "security alert",
    "suspended",
    "blocked",
    "refund",
    "cashback",
    "free",
    "internship",
    "registration fee",
    "offer",
    "bitcoin",
    "crypto",
    "wallet"
];

function keywordChecker(text) {

    text = text.toLowerCase();

    const foundKeywords = [];

    for (const keyword of keywords) {

        if (text.includes(keyword)) {
            foundKeywords.push(keyword);
        }

    }

    return foundKeywords;
}

module.exports = keywordChecker;