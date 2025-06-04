require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;

const {
  youtube_info,
  youtube_downloader,
} = require("./Routes/youtube-downloader");
const { image_converter } = require("./Routes/image-converter");
const { pdf_converter } = require("./Routes/pdf-converter");
const { chat } = require("./Routes/chatbot");

// PDF conversion dependencies
const path = require("path");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// YouTube converter dependencies
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
const fs = require("fs-extra");

// Set ffmpeg path from ffmpeg-static
ffmpeg.setFfmpegPath(ffmpegStatic);

// Use ffprobe-static for automatic ffprobe path detection
const ffprobePath = require("ffprobe-static").path;
ffmpeg.setFfprobePath(ffprobePath);

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, "temp_downloads");
fs.ensureDirSync(tempDir);

const app = express();
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.post("/api/youtube/info", youtube_info);
app.post("/api/youtube/download", youtube_downloader);

app.post("/convert/pdf", upload.single("file"), pdf_converter);
app.post("/convert/image", upload.single("file"), image_converter);

app.post("/chat", chat);

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
