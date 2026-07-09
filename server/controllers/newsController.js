const { getCyberNews } = require("../services/newsService");

const fetchNews = async (req,res)=>{

    try{

        const news=await getCyberNews();

        res.json(news);

    }catch(err){

        res.status(500).json({
            message:"Unable to fetch news"
        });

    }

}

module.exports={
    fetchNews
}