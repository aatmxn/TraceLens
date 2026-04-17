const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ['image', 'video'] },
    filePath: String,
    hash: String,           // pHash fingerprint
    keyframeHashes: [String], // for video only
    uploadedAt: { type: Date, default: Date.now },
    violationCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Asset', AssetSchema);