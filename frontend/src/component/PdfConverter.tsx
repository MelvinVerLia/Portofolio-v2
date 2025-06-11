import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, FileText, X } from "lucide-react";

// PDF Converter Component (no longer a dialog)
const PdfConverter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      // Simulate conversion process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("File converted successfully!");
      setSelectedFile(null); // Reset after conversion
    } catch (error) {
      console.error("Error during conversion:", error);
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
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="h-full flex flex-col">


      <div className="flex-1">
        {!selectedFile ? (
          <label
            htmlFor="pdf-file-upload"
            className="cursor-pointer block h-full"
          >
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center h-full flex flex-col items-center justify-center ${
                dragActive
                  ? "border-purple-500 bg-purple-900/20"
                  : "border-purple-700 hover:border-purple-500 bg-gray-800/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="p-2 bg-purple-900/50 rounded-full">
                  <Upload className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-xs text-gray-300">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </div>
                <input
                  type="file"
                  id="pdf-file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </label>
        ) : (
          <div className="space-y-3">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-purple-900/50 rounded">
                    <FileText className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-gray-200 truncate">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="p-1 rounded hover:bg-gray-700"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                  Converting...
                </>
              ) : (
                "Convert to PDF"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfConverter;
