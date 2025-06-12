const youtubeDl = require("youtube-dl-exec");
const { v4: uuidv4 } = require("uuid"); // For unique temp filenames
const path = require("path");
const fs = require("fs-extra");
// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, "temp_downloads");
fs.ensureDirSync(tempDir);
const ffmpeg = require("fluent-ffmpeg");
const ffmpegStatic = require("ffmpeg-static");
ffmpeg.setFfmpegPath(ffmpegStatic);

// Helper function to format duration from seconds to MM:SS or HH:MM:SS
function formatDuration(seconds) {
  if (!seconds) return "Unknown duration";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }
}

const youtube_info = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    console.log(`Fetching YouTube video info for: ${url}`);
    // Validate YouTube URL format
    const urlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!urlRegex.test(url)) {
      return res.status(400).json({ error: "Invalid YouTube link" });
    }

    const cleanUrl = url.split("&")[0]; // gets rid of playlist/query strings

    // Get video info using youtube-dl-exec
    const info = await youtubeDl(cleanUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      skipDownload: true,
    });

    console.log("Video info fetched successfully");
    // Extract only the needed information to keep the response light
    const videoInfo = {
      title: info.title,
      thumbnail: info.thumbnail,
      description: info.description,
      duration: formatDuration(info.duration),
      channel: info.channel || info.uploader,
      uploadDate: info.upload_date,
      formats:
        info.formats?.map((format) => ({
          format_id: format.format_id,
          ext: format.ext,
          resolution: format.resolution,
          fps: format.fps,
        })) || [],
    };
    console.log("Formatted video info:", videoInfo);
    res.json(videoInfo);
  } catch (error) {
    console.error("Error fetching video info:", error);
    res.status(500).json({
      error: "Failed to fetch video information",
      details: error.message,
    });
  }
};

const youtube_downloader = async (req, res) => {
  const { url, format, quality } = req.body;
  const tempId = uuidv4();
  const tempFilePath = path.join(tempDir, `${tempId}.${format}`);

  console.log(
    `Processing YouTube download request: ${url} in ${format} format`
  );

  if (!url || !format) {
    return res.status(400).json({ error: "URL and format are required" });
  }

  try {
    // Validate YouTube URL format
    const urlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!urlRegex.test(url)) {
      return res.status(400).json({ error: "Invalid YouTube link" });
    }

    // First get info to retrieve title
    const info = await youtubeDl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    const title = info.title.replace(/[^\w\s]/gi, "") || "youtube_video";

    // Set appropriate headers
    if (format === "mp4") {
      res.setHeader("Content-Type", "video/mp4");
    } else if (format === "mp3") {
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${title}.mp3"`
      );
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${title}.${format}"`
    );

    if (format === "mp4") {
      console.log("Starting MP4 download");

      let formatString;

      switch (quality) {
        case "4k":
          formatString = "bestvideo[height<=2160]+bestaudio/best[height<=2160]";
          break;
        case "1080p":
          formatString = "bestvideo[height<=1080]+bestaudio/best[height<=1080]";
          break;
        case "720p":
          formatString = "bestvideo[height<=720]+bestaudio/best[height<=720]";
          break;
        case "480p":
          formatString = "bestvideo[height<=480]+bestaudio/best[height<=480]";
          break;
        default:
          formatString = "bestvideo+bestaudio/best";
      }

      // Download video with yt-dlp with correct parameters
      // Note: yt-dlp uses --merge-output-format (with hyphens) instead of mergeOutputFormat
      await youtubeDl(url, {
        output: tempFilePath,
        format: formatString,
        "merge-output-format": "mp4",
        noWarnings: true,
        noCallHome: true,
        ffmpegLocation: ffmpegStatic, // Ensure ffmpeg is available for merging
      });

      // Stream the file to response
      const fileStream = fs.createReadStream(tempFilePath);
      fileStream.pipe(res);

      // Clean up file after sending
      fileStream.on("end", () => {
        fs.remove(tempFilePath).catch((err) =>
          console.error("Error removing temp file:", err)
        );
      });
      console.log(`MP4 download completed: ${tempFilePath}`);
    } else if (format === "mp3") {
      console.log("Starting MP3 conversion");

      // For mp3, download audio only
      console.log(`Selected quality: ${quality}`);
      let audioBitrate;
      switch (quality) {
        case "320": // High Quality (320 kbps)
          audioBitrate = 320;
          break;
        case "256": // Good Quality (256 kbps)
          audioBitrate = 256;
          break;
        case "192": // Standard Quality (192 kbps)
          audioBitrate = 192;
          break;
        case "128": // Low Quality (128 kbps)
          audioBitrate = 128;
          break;
        case "64": // Very Low Quality (64 kbps)
          audioBitrate = 64;
          break;
        default:
          audioBitrate = 192; // Default to Standard quality if not specified
      }
      console.log(`Using audio bitrate: ${audioBitrate} kbps`);

      const mp3OutputPath = path.join(tempDir, `${tempId}.mp3`);

      // Download audio with youtube-dl-exec
      await youtubeDl(url, {
        output: mp3OutputPath,
        extractAudio: true,
        audioFormat: "mp3",
        audioQuality: audioBitrate,
        noWarnings: true,
        noCallHome: true,
        ffmpegLocation: ffmpegStatic, // Explicitly tell youtube-dl where to find ffmpeg
      });

      // Verify file exists before proceeding
      if (!fs.existsSync(mp3OutputPath)) {
        console.error(`Audio file not found: ${mp3OutputPath}`);
        throw new Error("Downloaded audio file not found");
      }

      // Stream the file to response
      const fileStream = fs.createReadStream(mp3OutputPath);
      fileStream.pipe(res);

      fileStream.on("end", () => {
        // Clean up temp files
        try {
          fs.removeSync(mp3OutputPath);
          console.log("Cleaned up temp files");
        } catch (err) {
          console.error("Error removing temp files:", err);
        }
      });

      console.log(`MP3 conversion completed: ${tempFilePath}`);
    } else {
      res.status(400).json({ error: "Invalid format. Use mp3 or mp4." });
    }
  } catch (error) {
    console.error("Error in download process:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error", details: error.message });

      // Clean up temp files in case of error
      try {
        if (fs.existsSync(tempFilePath)) {
          fs.removeSync(tempFilePath);
        }
      } catch (cleanupError) {
        console.error("Error cleaning up temp files:", cleanupError);
      }
    }
  }
};

module.exports = { youtube_info, youtube_downloader };
