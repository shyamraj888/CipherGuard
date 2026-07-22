const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scanType: {
      type: String,
      trim: true,
      default: '',
    },
    extractedUrls: {
      type: [String],
      default: [],
    },
    keywordMatches: {
      type: [String],
      default: [],
    },
    googleSafeBrowsing: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    virusTotal: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    whois: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ssl: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    score: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      trim: true,
      default: '',
    },
    confidence: {
      type: Number,
      default: 0,
    },
    positives: {
      type: Number,
      default: 0,
    },
    warnings: {
      type: [String],
      default: [],
    },
    recommendations: {
      type: [String],
      default: [],
    },
    aiExplanation: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model('Scan', scanSchema);
