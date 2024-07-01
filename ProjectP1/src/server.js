const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/upload', upload.array('files', 12), (req, res) => {
    if (req.files) {
        res.json({
            success: true,
            message: 'Files uploaded successfully',
            files: req.files
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'No files uploaded'
        });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
