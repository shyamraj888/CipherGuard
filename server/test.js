require("dotenv").config();

const checkWhois = require("./services/safeBrowsingService");

(async()=>{

    const result = await checkWhois("https://testsafebrowsing.appspot.com/s/phishing.html");

    console.log(result);

})();