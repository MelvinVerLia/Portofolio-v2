import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Youtube, Music, Video, Film } from "lucide-react";
import ConvertFinder from "../../API/ConvertFinder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActionDialogProps {
  onClose: () => void;
}

const YoutubeDialog = ({ onClose }: ActionDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [fetchingInfo, setFetchingInfo] = useState(false);
  const [format, setFormat] = useState("mp4");
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [audioQuality, setAudioQuality] = useState("320");
  const [error, setError] = useState("");

  useEffect(() => {
    // Clear video info when URL changes
    setVideoInfo(null);
    setError("");
  }, [url]);

  const fetchVideoInfo = async () => {
    if (!url) return;

    try {
      console.log("Fetching video info for URL:", url);
      setFetchingInfo(true);
      setError("");
      const response = await ConvertFinder.post("/api/youtube/info", { url });
      setVideoInfo(response.data);
      console.log("Video info fetched:", response.data);
    } catch (error) {
      console.error("Error fetching video info:", error);
      setError(
        "Failed to fetch video information. Please check if the URL is valid."
      );
    } finally {
      setFetchingInfo(false);
    }
  };

  const handleDownload = async () => {
    if (!url) return;

    try {
      setIsLoading(true);
      setError("");

      const requestData = {
        url: url,
        format: format,
        quality: format === "mp4" ? videoQuality : audioQuality,
      };

      const response = await ConvertFinder.post("/api/download", requestData, {
        responseType: "blob",
      });

      // Determine content type based on format
      const contentType = format === "mp4" ? "video/mp4" : "audio/mpeg";

      // Create download link
      const downloadUrl = window.URL.createObjectURL(
        new Blob([response.data], { type: contentType })
      );

      const filename = videoInfo?.title
        ? `${videoInfo.title.replace(/[^\w\s]/gi, "")}.${format}`
        : `youtube_download.${format}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      console.log(`Downloaded ${format} from YouTube:`, url);
    } catch (error) {
      console.error(`Error during YouTube ${format} download:`, error);
      setError("Download failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent
          className="bg-gray-900 shadow-xl max-w-3xl"
          style={{ boxShadow: "0 0 20px 5px rgba(190, 100, 247, 0.8)" }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-400 text-center">
              YouTube Downloader
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Download videos or extract audio from YouTube
            </DialogDescription>
          </DialogHeader>

          <div className="my-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-purple-900/50 rounded-lg">
                <Youtube className="w-6 h-6 text-purple-400" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter YouTube URL"
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button
                onClick={fetchVideoInfo}
                disabled={!url || fetchingInfo}
                className="bg-purple-800 hover:bg-purple-700 text-white hover:cursor-pointer transition-colors duration-300"
              >
                {fetchingInfo ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Preview"
                )}
              </Button>
            </div>

            {error && (
              <div className="text-red-400 text-sm mb-3 bg-red-900/20 p-2 rounded-md">
                {error}
              </div>
            )}

            {videoInfo && (
              <div className="mb-4 bg-gray-800/50 p-3 rounded-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  {videoInfo.thumbnail && (
                    <div className="w-full md:w-1/3">
                      <img
                        src={videoInfo.thumbnail}
                        alt={videoInfo.title}
                        className="rounded-md w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  <div className="w-full md:w-2/3">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {videoInfo.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {videoInfo.channel}
                    </p>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Film className="w-4 h-4 mr-1" />
                      <span>{videoInfo.duration}</span>
                    </div>
                    {videoInfo.description && (
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {videoInfo.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Tabs
              defaultValue="mp4"
              onValueChange={setFormat}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full bg-gray-800">
                <TabsTrigger
                  value="mp4"
                  className="group flex items-center gap-2 hover:cursor-pointer text-white data-[state=active]:text-black"
                >
                  <Video className="w-4 h-4 group-data-[state=active]:text-black" />
                  Video (MP4)
                </TabsTrigger>
                <TabsTrigger
                  value="mp3"
                  className="group flex items-center gap-2 hover:cursor-pointer text-white data-[state=active]:text-black"
                >
                  <Music className="w-4 h-4 group-data-[state=active]:text-black" />
                  Audio (MP3)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mp4" className="mt-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Video Quality</label>
                  <Select value={videoQuality} onValueChange={setVideoQuality}>
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white hover:cursor-pointer">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white hover:cursor-pointer">
                      <SelectItem value="4k">4K (2160p)</SelectItem>
                      <SelectItem value="1080p">Full HD (1080p)</SelectItem>
                      <SelectItem value="720p">HD (720p)</SelectItem>
                      <SelectItem value="480p">SD (480p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="mp3" className="mt-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Audio Quality</label>
                  <Select value={audioQuality} onValueChange={setAudioQuality}>
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white hover:cursor-pointer">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white hover:cursor-pointer">
                      <SelectItem value="320">
                        High Quality (320 kbps)
                      </SelectItem>
                      <SelectItem value="256">
                        Good Quality (256 kbps)
                      </SelectItem>
                      <SelectItem value="192">
                        Standard Quality (192 kbps)
                      </SelectItem>
                      <SelectItem value="128">
                        Low Quality (128 kbps)
                      </SelectItem>
                      <SelectItem value="64">
                        Very Low Quality (64 kbps)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-gray-400 text-xs mt-1">
                    <p>
                      Higher bitrate provides better audio quality but results
                      in larger file sizes.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
              onClick={handleDownload}
              disabled={!url || isLoading}
              className="bg-purple-800 hover:bg-purple-700 text-white hover:cursor-pointer transition-colors duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Download ${format.toUpperCase()}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YoutubeDialog;
