import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import PdfConverter from "./PdfConverter";
import ImageConverter from "./ImageConverter";
import YoutubeConverter from "./YoutubeConverter";
import AnnoyingAvatar from "./AnnoyingAvatar";

const BentoHero = () => {
  const [selectedTool, setSelectedTool] = useState(0);
  const componentRef = useRef(null);

  const tools = [
    {
      name: "PDF Converter",
      icon: "📄",
      status: "Offline",
      component: PdfConverter,
    },
    {
      name: "Image Converter",
      icon: "wiwo",
      status: "Offline",
      component: ImageConverter,
    },
    {
      name: "Youtube Downloader",
      icon: "wowo",
      status: "Offline",
      component: YoutubeConverter,
    },
  ];

  const SelectedToolComponent = tools[selectedTool].component;

  return (
    <>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Dynamic Grid with fixed heights */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-[750px]">
          {/* Top Left - Profile (2x2 square) */}
          <div className="md:col-span-2 md:row-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-0 flex flex-col justify-center items-center h-full w-[500px]">
            <AnnoyingAvatar />
          </div>

          {/* Top Right - Simple Info */}
          <motion.div
            className="md:col-span-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 flex flex-col justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ height: "200px" }}
          >
            idk what to put here
          </motion.div>

          {/* Bottom Right - Tools Showcase - Now matches left box height */}
          <motion.div
            className="md:col-span-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ height: "calc(750px - 200px - 24px)" }} // Total height minus top box minus gap
          >
            <h3 className="text-xl font-bold text-white mb-4">Useful Tools</h3>

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
                  <span className="mr-2">{tool.icon}</span>
                  {tool.name}
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
                    No tool available.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BentoHero;
