const express = require('express');
const url = express.Router();
const multer = require('multer');
const { addVideoUrl } = require('../Controller/tbl_urls');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

url.post('/api/videos/upload', upload.single('video'), addVideoUrl);

module.exports = { url };
