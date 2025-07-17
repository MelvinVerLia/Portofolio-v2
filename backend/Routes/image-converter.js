const sharp = require("sharp");
const pdf = require("pdf-poppler");
const fs = require("fs-extra");
const path = require("path");

const image_converter = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { format, quality } = req.body;
  if (!format || !quality) {
    return res.status(400).json({ error: "Format and quality are required" });
  }

  console.log(
    `Converting image: ${req.file.originalname} (${req.file.mimetype})`
  );

  const filePath = req.file.buffer;
  const outputExt = format === "jpg" ? "jpeg" : format;

  try {
    let image = sharp(filePath);

    switch (format) {
      case "png":
        image = image.png({ quality: parseInt(quality) });
        break;
      case "jpeg":
        image = image.jpeg({ quality: parseInt(quality) });
        break;
      case "webp":
        image = image.webp({ quality: parseInt(quality) });
        break;
      default:
        return res.status(400).json({ error: "Unsupported format" });
    }

    const buffer = await image.toBuffer();

    res.setHeader("Content-Type", `image/${outputExt}`);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=converted.${outputExt}`
    );
    res.send(buffer);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: "Conversion failed",
      details: error.message,
    });
  }
};

module.exports = { 
  image_converter, 

};