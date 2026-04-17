const sharp = require('sharp');

// Perceptual hash: resize to 8x8 grayscale, compare each pixel to mean
// Similar images produce similar hashes even if cropped/resized/compressed
async function generatePHash(imagePath) {
    const { data } = await sharp(imagePath)
        .resize(8, 8, { fit: 'fill' })
        .grayscale()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const pixels = Array.from(data);
    const mean = pixels.reduce((a, b) => a + b, 0) / pixels.length;

    // Build 64-bit hash string: 1 if pixel > mean, else 0
    const hashBits = pixels.map(p => (p > mean ? '1' : '0')).join('');

    // Convert binary string to hex for compact storage
    const hex = parseInt(hashBits, 2).toString(16).padStart(16, '0');
    return hex;
}

// Hamming distance: count differing bits between two hashes
// Lower = more similar. <10 is a strong match
function hammingDistance(hash1, hash2) {
    const bin1 = parseInt(hash1, 16).toString(2).padStart(64, '0');
    const bin2 = parseInt(hash2, 16).toString(2).padStart(64, '0');

    let diff = 0;
    for (let i = 0; i < 64; i++) {
        if (bin1[i] !== bin2[i]) diff++;
    }
    return diff;
}

function similarityScore(hash1, hash2) {
    const dist = hammingDistance(hash1, hash2);
    return Math.round(((64 - dist) / 64) * 100);
}

module.exports = { generatePHash, hammingDistance, similarityScore };