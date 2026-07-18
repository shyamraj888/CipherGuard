const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const newsRoutes = require("./Routes/newsRoute");
const scanRoutes = require("./Routes/scanRoutes");

dotenv.config();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});