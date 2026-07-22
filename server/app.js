const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
require("dotenv").config();

console.log("SAFE:", process.env.SAFE_API_KEY);
console.log("VT:", process.env.VT_API_KEY);
console.log("WHOIS:", process.env.WHOIS_API_KEY);

const newsRoutes = require("./Routes/newsRoute");
const scanRoutes = require("./Routes/scanRoutes");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "CipherGuard API Running"
    });
});

app.use("/api/news", newsRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/auth", require("./Routes/authRoute"));

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});