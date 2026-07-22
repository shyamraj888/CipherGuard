// utils/extractUrls.js

function extractUrls(text) {
    if (!text || typeof text !== "string") {
        return [];
    }

    const urlPattern = /\b(?:https?:\/\/|www\.)[^\s<>"'()\[\]]+/gi;
    const domainPattern = /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?:\/[^\s<>"'()]*)?/gi;

    const rawMatches = [
        ...(text.match(urlPattern) || []),
        ...(text.match(domainPattern) || [])
    ];

    const normalized = [...new Set(rawMatches.map((match) => {
        let url = match.trim().replace(/[.,!?;:]+$/g, "");

        if (/^www\./i.test(url)) {
            return `https://${url}`;
        }

        if (/^https?:\/\//i.test(url)) {
            return url;
        }

        return `https://${url}`;
    }))];

    return normalized;
}

module.exports = extractUrls;