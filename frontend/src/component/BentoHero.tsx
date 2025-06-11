import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PdfConverter from "./PdfConverter";
import ImageConverter from "./ImageConverter";
import YoutubeConverter from "./YoutubeConverter";

const BentoHero = () => {
  const [selectedTool, setSelectedTool] = useState(0);
  const [toolBoxHeight, setToolBoxHeight] = useState(192); // Default h-48 = 192px
  const componentRef = useRef(null);

  const tools = [
    {
      name: "PDF Converter",
      description: "pdf converter duh",
      icon: "📄",
      status: "Offline",
      component: PdfConverter,
    },
    {
      name: "Image Converter",
      description: "image duh",
      icon: "wiwo",
      status: "Offline",
      component: ImageConverter,
    },
    {
      name: "Youtube Downloader",
      description: "Mp3 Mp4 Shenanigans",
      icon: "wowo",
      status: "Offline",
      component: YoutubeConverter,
    },
  ];

  const skills = [
    "React",
    "Python",
    "TypeScript",
    "Node.js",
    "AI/ML",
    "Data Analysis",
  ];

  // Monitor component size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        // Set minimum height to 192px (h-48), but allow expansion
        setToolBoxHeight(Math.max(192, height + 48)); // +48 for padding
      }
    });

    if (componentRef.current) {
      resizeObserver.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        resizeObserver.unobserve(componentRef.current);
      }
    };
  }, [selectedTool]);

  const SelectedToolComponent = tools[selectedTool].component;

  return (
    <>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Dynamic Grid that adapts to tool box height */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6" style={{ minHeight: '750px' }}>
          {/* Top Left - Profile (2x2 square) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ height: 'fit-content', minHeight: '750px' }}
          >
            <motion.div
              className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="dog.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              Milord Portolomeus
            </h2>
            <p className="text-gray-400 text-center mb-4">
              CS Undergrad • Intern @Anabatic
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-full border border-slate-600/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* CV Download */}
            <motion.button
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-600/30 w-s "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download CV
            </motion.button>
          </motion.div>

          {/* Right side container */}
          <div className="md:col-span-3 flex flex-col gap-6">
            {/* Top Right - Simple Info */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 flex flex-col justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ height: '200px' }}
            >
              idk what to put here
            </motion.div>

            {/* Bottom Right - Tools Showcase (Dynamic Height) */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                minHeight: '350px',
                height: 'fit-content'
              }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Useful Stuff</h3>

              <div className="flex flex-wrap gap-3 mb-6">
                {tools.map((tool, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedTool(index)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedTool === index
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                        : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
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
                transition={{ duration: 0.3 }}
                className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30"
                style={{ 
                  minHeight: '192px',
                  height: 'fit-content'
                }}
              >
                <div ref={componentRef}>
                  {SelectedToolComponent ? (
                    <SelectedToolComponent />
                  ) : (
                    <div className="text-gray-400">No tool available.</div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BentoHero;