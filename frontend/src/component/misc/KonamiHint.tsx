import React from "react";
import { motion } from "framer-motion";

const KonamiHint = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/4 to-pink-900/4 rounded-2xl"></div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: [0.1, 0.7, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="text-center">
          {/* Konami sequence preview */}
          <div className="flex items-center justify-center gap-2 mb-3 text-purple-400/80 text-base">
            <span>↑</span>
            <span>↑</span>
          </div>

          {/* Cryptic text hint */}
          <div className="text-sm text-purple-300/60 font-mono tracking-wider mb-1">
            古い道を覚えている？
          </div>

          {/* Even more subtle English hint */}
          <div className="text-xs text-purple-200/40 font-mono tracking-widest">
            the old ways...
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default KonamiHint;
