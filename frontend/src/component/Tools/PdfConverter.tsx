import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, FileText, X, Download, FileImage } from "lucide-react";

const PdfConverter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);

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
      // Simulate conversion process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setConversionComplete(true);
    } catch (error) {
      console.error("Error during conversion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setConversionComplete(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setConversionComplete(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setConversionComplete(false);
  };

  const resetConverter = () => {
    setSelectedFile(null);
    setConversionComplete(false);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {!selectedFile ? (
          // Upload Area
          <motion.label
            htmlFor="pdf-file-upload"
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
                  id="pdf-file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </motion.div>
          </motion.label>
        ) : (
          // File Processing Area
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col space-y-4 w-full">
              {/* File Info */}

              <motion.div
                className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div className="p-4 bg-purple-600/20 rounded-full shadow-lg">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-200 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1.5 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex-1 flex flex-col  space-y-3">
                {!conversionComplete ? (
                  <motion.button
                    onClick={handleUpload}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-800 disabled:to-purple-900 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-purple-600/30 hover:cursor-pointer disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.01 }}
                    whileTap={{ scale: isLoading ? 1 : 0.99 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Converting...</span>
                      </div>
                    ) : (
                      "Convert File"
                    )}
                  </motion.button>
                ) : (
                  <div className="space-y-3">
                    <motion.div
                      className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <p className="text-sm text-green-400 font-medium">
                        ✓ Conversion Complete!
                      </p>
                    </motion.div>

                    <div className="flex space-x-2">
                      <motion.button
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-800 disabled:to-purple-900   text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center hover:cursor-pointer disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </motion.button>

                      <motion.button
                        onClick={resetConverter}
                        className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm transition-all duration-300 hover:cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        New File
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfConverter;
