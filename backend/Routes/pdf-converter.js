const libre = require("libreoffice-convert");
const fs = require("fs-extra");

const pdf_converter = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log(
    `Converting file: ${req.file.originalname} (${req.file.mimetype})`
  );

  const outputPath = ".pdf";

  try {
    const docxFile = req.file.buffer;
    const extension = ".pdf";

    // Convert document to PDF
    libre.convert(docxFile, extension, undefined, (err, done) => {
      if (err) {
        console.error(`Conversion Error:`, err);
        return res.status(500).json({
          error: "Conversion failed",
          details: err.message,
        });
      }

      try {
        fs.writeFileSync(outputPath, done);
        console.log(`Conversion successful. File saved to ${outputPath}`);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=converted.pdf"
        );

        // Stream the file to the client
        const fileStream = fs.createReadStream(outputPath);
        fileStream.pipe(res);
      } catch (writeErr) {
        console.error("File operation error:", writeErr);
        return res.status(500).json({
          error: "File operation failed",
          details: writeErr.message,
        });
      }
    });
  } catch (readErr) {
    console.error("File read error:", readErr);
    return res.status(500).json({
      error: "Failed to read uploaded file",
      details: readErr.message,
    });
  }
};

module.exports = { pdf_converter };
