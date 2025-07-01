import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PdfConverter from "../Tools/PdfConverter";
import ImageConverter from "../Tools/ImageConverter";
import YoutubeConverter from "../Tools/YoutubeConverter";
import { Youtube, File, Image } from "lucide-react";

const ToolSection = () => {
  const [selectedTool, setSelectedTool] = useState(0);
  const componentRef = useRef(null);

  const tools = [
    {
      name: "PDF Converter",
      icon: File,
      status: "Offline",
      component: PdfConverter,
    },
    {
      name: "Image Converter",
      icon: Image,
      status: "Offline",
      component: ImageConverter,
    },
    {
      name: "Youtube Downloader",
      icon: Youtube,
      status: "Offline",
      component: YoutubeConverter,
    },
  ];

  const SelectedToolComponent = tools[selectedTool].component;
  return (
    <>
      <h3 className="text-xl font-bold text-white mb-4 text-left">
        Useful Tools
      </h3>

      <div className="flex flex-wrap gap-2 mb-4 ">
        {tools.map((tool, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedTool(index)}
            className={`px-3 py-2 rounded-lg text-sm font-medium hover:cursor-pointer ${
              selectedTool === index
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mr-2 flex justify-center items-center gap-2">
              <tool.icon />
              {tool.name}
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        key={selectedTool}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        // transition={{ duration: 0.3 }}
        className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30 flex-1 min-h-0"
      >
        <div ref={componentRef} className="h-full">
          {SelectedToolComponent ? (
            <SelectedToolComponent />
          ) : (
            <div className="text-gray-400 flex items-center justify-center h-full">
              No Tools available.
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ToolSection;
