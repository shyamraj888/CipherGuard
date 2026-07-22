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
    "wallet",
      "urgent",
    "immediately",
    "last day",
    "today only",
    "only today",
    "only 1 hour",
    "limited time",
    "expires today",
    "final call",
    "act now",
    "don't miss",
    "before 11:59",
    "hurry",
    "deadline",
    "registration closes",
    "offer ends",
    "few seats left",
    "last chance",
    "only few spots",
    "time running out"
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