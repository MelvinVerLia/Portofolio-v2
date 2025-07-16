import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeroContext } from "@/context/HeroContextProvider";
const phrases = [
  "Stop touching me.",
  "Seriously?",
  "I'll call my mom",
  "Bro chill.",
  "You're not gonna win.",
  "WHY.",
  "Fine. Whatever.",
];

const AvatarSection = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [runaway, setRunaway] = useState({ x: 0, y: 0 });
  const { setChatbot, chatbot } = useHeroContext();

  const avatarRef = useRef(null);

  const handleClick = () => {
    console.log(clickCount);
    console.log(chatbot);
    if (clickCount >= 6) {
      setChatbot(true);
      return;
    }

    setClickCount((prev) => prev + 1);
    setShowBubble(true);

    setTimeout(() => {
      setShowBubble(false);
    }, 1000);
  };

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 200);
    const y = Math.floor(Math.random() * 400);
    return { x, y };
  };

  useEffect(() => {
    if (clickCount < 3) return;

    const interval = setInterval(() => {
      setRunaway(getRandomPosition());
    }, 1000);

    return () => clearInterval(interval);
  }, [clickCount]);

  const currentPhrase = phrases[Math.min(clickCount, phrases.length - 1)];

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <motion.div
        className="relative"
        animate={runaway}
        transition={{ type: "tween" }}
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              key="bubble"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: -30 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-sm px-20 py-4 rounded-xl shadow-md border border-purple-500 max-w-lg z-10"
            >
              {currentPhrase}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-800 border-l border-b border-purple-500 rotate-45 z-[-1]" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.img
          ref={avatarRef}
          src="/dog.jpg"
          alt="avatar"
          onClick={handleClick}
          whileHover={{ scale: 1.2 }}
          className="w-24 h-24 rounded-full border-2 border-purple-500 cursor-pointer"
        />
      </motion.div>

      {/* Name and Role */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-1">
          Milord Portolomeus
        </h2>
        <p className="text-gray-400 mb-4">CS Undergrad • Intern @Anabatic</p>

        <motion.button
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-600/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Download CV
        </motion.button>
      </div>
    </div>
  );
};
export default AvatarSection;
