import { Loader2, Music, Video, Youtube } from "lucide-react";
import ConvertFinder from "../../API/ConvertFinder";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotification } from "@/context/NotificationContextProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const YoutubeConverter = () => {
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [fetchingInfo, setFetchingInfo] = useState(false);
  const [format, setFormat] = useState("mp4");
  const [videoQuality, setVideoQuality] = useState("1080p");
  const [audioQuality, setAudioQuality] = useState("320");

  useEffect(() => {
    setVideoInfo(null);
  }, [url]);

  const getYoutubeVideoId = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const fetchVideoInfo = async () => {
    if (!url) {
      return;
    }
    if (videoInfo) {
      setShowDialog(true);
      return;
    }
    try {
      setShowDialog(true);
      setFetchingInfo(true);
      console.log("Fetching video info for URL:", url);
      const response = await ConvertFinder.post("/api/youtube/info", { url });
      setVideoInfo(response.data);
      console.log("Video info fetched:", response.data);
    } catch (err) {
      console.log("Error fetching video info:", err);
      showNotification(
        "error",
        "Server error while fetching video information. Please try again."
      );
    } finally {
      setFetchingInfo(false);
    }
  };

  const handleDownload = async () => {
    if (!url) return;

    try {
      setIsLoading(true);

      const requestData = {
        url: url,
        format: format,
        quality: format === "mp4" ? videoQuality : audioQuality,
      };

      const response = await ConvertFinder.post(
        "/api/youtube/download",
        requestData,
        {
          responseType: "blob",
        }
      );

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
      showNotification(
        "error",
        `Failed to download ${format.toUpperCase()}. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 shadow-xl max-w-3xl border border-gray-950 rounded-xl p-5 h-full flex flex-col justify-center">
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
            className="bg-purple-800 hover:bg-purple-700 text-white hover:cursor-pointer transition-colors duration-300 h-10.5"
          >
            {fetchingInfo ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Preview"
            )}
          </Button>
        </div>

        {videoInfo && (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="bg-gray-900 border border-gray-700 text-white max-w-3xl">
              <DialogHeader>
                <DialogTitle>{videoInfo.title}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  From {videoInfo.channel}
                </DialogDescription>
              </DialogHeader>

              {/* 📺 Embedded YouTube Player */}
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-700">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                    url
                  )}`}
                  title={videoInfo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {videoInfo.description && (
                <p
                  className="text-sm text-gray-300 whitespace-pre-wrap max-h-48 overflow-y-auto px-3 custom-scrollbar"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#9333ea #1f2937",
                  }}
                >
                  {videoInfo.description}
                </p>
              )}
            </DialogContent>
          </Dialog>
        )}

        <Tabs defaultValue="mp4" onValueChange={setFormat} className="w-full">
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
              <div className="text-gray-400 text-xs mt-1">
                <p>Higher quality results in larger file sizes.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mp3" className="mt-4">
            <div className="space-y-2">
              <Select value={audioQuality} onValueChange={setAudioQuality}>
                <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white hover:cursor-pointer">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white hover:cursor-pointer">
                  <SelectItem value="320">High Quality (320 kbps)</SelectItem>
                  <SelectItem value="256">Good Quality (256 kbps)</SelectItem>
                  <SelectItem value="192">
                    Standard Quality (192 kbps)
                  </SelectItem>
                  <SelectItem value="128">Low Quality (128 kbps)</SelectItem>
                  <SelectItem value="64">Very Low Quality (64 kbps)</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-gray-400 text-xs mt-1">
                <p>Higher quality results in larger file sizes.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-row gap-2 justify-end mt-2">
        <Button
          variant="outline"
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
      </div>
    </div>
  );
};

export default YoutubeConverter;
