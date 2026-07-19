// utils/extractUrls.js

function extractUrls(text) {

    const regex = /(https?:\/\/[^\s]+)/g;

    return text.match(regex) || [];

}

module.exports = extractUrls;