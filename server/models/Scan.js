const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    scanType: {
        type: String,
        enum: ["url", "email", "message", "image"],
        required: true
    },

    input: {
        type: String
    },

    riskScore: {
        type: Number,
        default: 0
    },

    riskLevel: {
        type: String,
        enum: ["SAFE", "LOW", "MEDIUM", "HIGH", "CRITICAL"],
        default: "SAFE"
    },

  
    reportUrl: {
        type: String,
        default: ""
    },

    isBookmarked: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Scan", scanSchema);