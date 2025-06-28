import { Button } from "@/components/ui/button";
import ConvertFinder from "../../API/ConvertFinder";
import { FileImage, Loader2, Upload, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImageConverter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(1);

  const bounceAnimation = useMemo(() => ({ y: [0, -10, 0] }), []);
  const bounceTransition = useMemo(
    () => ({
      duration: 1.3,
      repeat: Infinity,
      repeatType: "loop" as "loop",
      ease: "easeInOut",
    }),
    []
  );

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
        <motion.label
          htmlFor="image-upload"
          className="cursor-pointer flex-1"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 600 }}
        >
          <motion.div
            className={`border-2 border-dashed rounded-xl p-14 h-full flex flex-col items-center justify-center transition-all duration-450 ${
              dragActive
                ? "border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                : "border-purple-600/50 hover:border-purple-500 bg-slate-700/20 hover:bg-slate-700/30"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <motion.div
                className="p-4 bg-purple-600/20 rounded-full shadow-lg border-purple-500/30"
                animate={dragActive ? bounceAnimation : { y: 0 }}
                transition={dragActive ? bounceTransition : { duration: 0.2 }}
              >
                <FileImage className="w-8 h-8 text-purple-400" />
              </motion.div>
              <div className="text-sm text-gray-300">
                <span className="font-semibold text-white">
                  Click to upload
                </span>{" "}
                or drag and drop
              </div>
              <div className="text-xs text-gray-400">
                JPG, PNG, WEBP supported
              </div>
              <input
                type="file"
                id="image-upload"
                accept=".jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </motion.div>
        </motion.label>
      ) : (
        <div className="space-y-4 flex-1">
          <motion.div
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <FileImage className="w-5 h-5 text-purple-400" />
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
              <label className="text-sm text-gray-300 font-medium">
                Output Format
              </label>
              <Select value={format} onValueChange={(e) => setFormat(e)}>
                <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white hover:cursor-pointer">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white hover:cursor-pointer focus:ring-purple-500">
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WEBP</SelectItem>
                </SelectContent>
              </Select>
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
                className="w-full accent-purple-600  transition-all duration-300 hover:cursor-pointer"
              />
            </div>
          </div>

          <motion.button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-800 disabled:to-purple-900 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-purple-600/30 hover:cursor-pointer disabled:cursor-not-allowed"
            whileHover={{ scale: isLoading ? 1 : 1.01 }}
            whileTap={{ scale: isLoading ? 1 : 0.99 }}
          >
            {isLoading ? (
              <>
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Converting...</span>
                </div>
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
