import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const Hero = () => {
  const TypewriterEffect: React.FC<{
    texts: string[];
    delayBetweenLines: number;
    typingSpeed: number;
  }> = ({ texts, delayBetweenLines, typingSpeed }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
      const startTimer = setTimeout(() => {
        setStarted(true);
      }, 1800); // tweak this if you want longer pause before typing

      return () => clearTimeout(startTimer);
    }, []);

    useEffect(() => {
      if (!started || lineIndex >= texts.length) return;

      const currentLine = texts[lineIndex];

      if (charIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev + currentLine[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);

        return () => clearTimeout(timer);
      } else {
        // Move to next line after delay
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev + "\n");
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }, delayBetweenLines);

        return () => clearTimeout(timer);
      }
    }, [charIndex, lineIndex, texts, delayBetweenLines, typingSpeed, started]);

    return (
      <pre className="whitespace-pre-line text-green-400 font-mono">
        {displayedText}
      </pre>
    );
  };
  return (
    <>
      {/* Optional Floating BG Gradient Blobs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Profile Picture */}
      <motion.div
        className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      {/* Additional subtle blob for depth */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Profile Picture with improved animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
        }}
        className="relative mb-4"
      >
        <div className="absolute inset-0 rounded-4xl bg-gradient-to-br from-indigo-500 to-purple-600 blur-sm opacity-70 animate-pulse"></div>
        <img
          src="dog.jpg"
          alt="My Glorious Face"
          className="w-80 h-80 rounded-4xl relative z-10 border-2 border-purple-300/30 object-cover object-center shadow-lg"
        />
      </motion.div>

      {/* Text Content with staggered animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
        >
          Milord Portolomeus
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mb-8"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-4 text-lg text-gray-300 max-w-xl mx-auto"
        >
          I break shit and fix it{" "}
          <span className="text-purple-300 font-semibold">(sometimes)</span>.
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="text-sm mt-2 block"
          >
            CS Undergrad • Intern @Anabatic • Stock Copium Addict
          </motion.span>
        </motion.p>
      </motion.div>

      {/* Scroll Indicator with improved animation */}
      <motion.div
        className="mt-10 text-purple-400 text-sm font-medium flex items-center gap-2 cursor-pointer hover:text-pink-400 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -5, 0],
        }}
        transition={{
          opacity: { delay: 5.8, duration: 0.5 },
          y: {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          },
        }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex gap-2 items-center justify-center text-purple-400 text-sm font-medium hover:text-pink-400 transition-colors duration-300 hover:cursor-pointer">
              <span>Click here for my CV</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl w-[90vw] h-[90vh] p-0 bg-[#1a1a2e] border border-purple-800/30">
            <div className="w-full h-full overflow-hidden rounded-lg">
              <iframe
                src="CV.pdf"
                className="w-full h-full border-0"
                style={{ display: "block" }}
                allow="fullscreen"
              />
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
};

export default Hero;
