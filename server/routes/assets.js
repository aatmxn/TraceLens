const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Asset = require('../models/Asset');
const { generatePHash } = require('../utils/hasher');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// POST /api/assets/upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const isVideo = ['.mp4', '.mov', '.avi'].includes(ext);

        let hash = null;
        if (!isVideo) {
            hash = await generatePHash(filePath);
        }
        // Video keyframe hashing comes in Phase 3

        const asset = await Asset.create({
            name: req.body.name || req.file.originalname,
            type: isVideo ? 'video' : 'image',
            filePath,
            hash
        });

        res.json({ success: true, asset });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/assets
router.get('/', async (req, res) => {
    const assets = await Asset.find().sort({ uploadedAt: -1 });
    res.json(assets);
});

module.exports = router;