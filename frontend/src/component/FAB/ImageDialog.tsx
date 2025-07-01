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
import { Loader2, Upload, FileImage, X } from "lucide-react";
import ConvertFinder from "../../../API/ConvertFinder";

interface ActionDialogProps {
  onClose: () => void;
}

const ImageDialog = ({ onClose }: ActionDialogProps) => {
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="bg-gray-900 shadow-xl"
        style={{ boxShadow: "0 0 20px 5px rgba(190, 100, 247, 0.8)" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-400 text-center">
            Convert Your Image
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center">
            Upload an image and convert it to another format
          </DialogDescription>
        </DialogHeader>

        <div className="my-4">
          {!selectedFile ? (
            <label htmlFor="image-upload" className="cursor-pointer">
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
                    id="image-upload"
                    accept=".jpg,.jpeg,.png,.webp"
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
                    <FileImage className="w-6 h-6 text-purple-400" />
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

        <div className="grid gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300 font-medium">
              Output Format
            </label>
            <select
              className="bg-gray-800 text-white border border-purple-700 p-2 rounded-md"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300 font-medium">
              Compression Quality: {quality}
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full accent-purple-400"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-2 justify-end mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-purple-800 hover:bg-purple-700 text-white border-0 hover:cursor-pointer hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className="bg-purple-800 hover:bg-purple-700 text-white hover:text-white hover:cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              "Convert Image"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
