const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const extractText = require('../utils/extractText');
const Document = require('../models/Document');

const router = express.Router();
const uploadFolder = 'uploads';

// Ensure uploads folder exists
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolder),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        console.log('Received file:', req.file);
        const file = req.file;
        const ext = path.extname(file.originalname).toLowerCase();
        const fileType = ext === '.pdf' ? 'pdf' : ext === '.docx' ? 'docx' : 'txt';

        const text = await extractText(file.path, fileType);
        const doc = new Document({ filename: file.originalname, text });
        await doc.save();

        res.json({ success: true, docId: doc._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload document' });
    }
});

module.exports = router;
