import { Button } from "@/components/ui/button";
import ConvertFinder from "../../API/ConvertFinder";
import { FileImage, Loader2, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(1);

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("format", format);
      formData.append("quality", quality.toString());

      const response = await ConvertFinder.post("/convert/image", formData, {
        responseType: "blob",
      });

      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `${selectedFile.name}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Conversion failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => setSelectedFile(null);

  return (
    <div className="h-full flex flex-col space-y-4">
      {!selectedFile ? (
        <label htmlFor="image-upload" className="cursor-pointer flex-1">
          <motion.div
            className={`border-2 border-dashed rounded-xl p-6 text-center h-full flex flex-col items-center justify-center transition-all duration-300 ${
              dragActive
                ? "border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                : "border-slate-600 hover:border-purple-400 bg-slate-800/30 hover:bg-slate-700/30"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <motion.div 
                className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg"
                whileHover={{ rotate: 10 }}
              >
                <FileImage className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-sm text-gray-300">
                <span className="font-semibold text-white">Click to upload</span> or drag and drop
              </div>
              <div className="text-xs text-gray-400">JPG, PNG, WEBP supported</div>
              <input
                type="file"
                id="image-upload"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </motion.div>
        </label>
      ) : (
        <div className="space-y-4 flex-1">
          <motion.div 
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <FileImage className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-white truncate">
                    {selectedFile.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              </div>
              <motion.button
                onClick={removeFile}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </motion.button>
            </div>
          </motion.div>

          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300 font-medium">Output Format</label>
              <select
                className="bg-slate-800/50 text-white border border-slate-700/50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300 font-medium">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          <motion.button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-800 disabled:to-cyan-800 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/25"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                Converting...
              </>
            ) : (
              "Convert Image"
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
