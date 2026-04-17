const mongoose = require('mongoose');

const ViolationSchema = new mongoose.Schema({
    assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
    assetName: String,
    sourceUrl: String,
    imageUrl: String,
    similarityScore: Number,   // 0-100
    detectedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['new', 'reviewed', 'reported'], default: 'new' }
});

module.exports = mongoose.model('Violation', ViolationSchema);