const mongoose = require('mongoose');

const threatIntelligenceSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    totalScans: {
      type: Number,
      default: 0,
    },
    maliciousCount: {
      type: Number,
      default: 0,
    },
    averageRisk: {
      type: Number,
      default: 0,
    },
    firstSeen: {
      type: Date,
      default: null,
    },
    lastSeen: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ThreatIntelligence', threatIntelligenceSchema);
