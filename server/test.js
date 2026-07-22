require("dotenv").config();

const sendOTPEmail = require("./services/emailService");

(async()=>{

    try{

        await sendOTPEmail(
            "fantasticfunfair@gmail.com",
            "654321"
        );

        console.log("Done");

    }

    catch(err){

        console.log(err);

    }

})();