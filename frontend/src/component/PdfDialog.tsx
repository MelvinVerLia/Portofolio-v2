import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, FileText, X } from "lucide-react";
import ConvertFinder from "../../API/ConvertFinder";

interface ActionDialogProps {
  onClose: () => void;
}

const PdfDialog = ({ onClose }: ActionDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await ConvertFinder.post("/convert", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
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
    <div>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent
          className="bg-gray-900 shadow-xl"
          style={{ boxShadow: "0 0 20px 5px rgba(190, 100, 247, 0.8)" }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-400 text-center">
              Convert Your File
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Upload a file to convert it to PDF format
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            {!selectedFile ? (
              <label htmlFor="file-upload" className="cursor-pointer">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive
                      ? "border-purple-500 bg-purple-900/20"
                      : "border-purple-700 hover:border-purple-500 bg-gray-800/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-3 bg-purple-900/50 rounded-full">
                      <Upload className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="text-sm text-gray-300">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </div>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </label>
            ) : (
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-900/50 rounded-lg">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-200 truncate max-w-xs">
                        {selectedFile.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1 rounded-full hover:bg-gray-700 hover:cursor-pointer"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-row gap-2 justify-end mt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-purple-800 hover:bg-purple-700 text-white hover:text-white border-0 hover:cursor-pointer transition-colors duration-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className="bg-purple-800 hover:bg-purple-700 text-white hover:cursor-pointer transition-colors duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to PDF"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PdfDialog;
