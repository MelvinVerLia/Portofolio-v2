import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // ShadCN
import Chatbot from "../component/Chatbot"; // your actual chatbot component

const phrases = [
  "Stop touching me.",
  "Seriously?",
  "I'll call HR.",
  "Bro chill.",
  "You're not gonna win.",
  "WHY.",
  "Fine. Whatever.",
];

export default function AnnoyingAvatar() {
  const [clickCount, setClickCount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const avatarRef = useRef(null);

  const handleClick = () => {
    if (clickCount >= 6) {
      setShowDialog(false);
      setShowChatbot(true);
      return;
    }

    setClickCount((prev) => prev + 1);
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 1200);
  };

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 300 - 150); // between -150 to +150
    const y = Math.floor(Math.random() * 300 - 150);
    return { x, y };
  };

  const currentPhrase = phrases[Math.min(clickCount, phrases.length - 1)];
  const runaway = clickCount >= 3 ? getRandomPosition() : { x: 0, y: 0 };

  if (showChatbot) {
    return <Chatbot />;
  }

  return (
    <>
      <motion.img
        ref={avatarRef}
        src="/dog.jpg"
        alt="avatar"
        onClick={handleClick}
        whileHover={{ scale: 1.2 }}
        animate={runaway}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-24 h-24 rounded-full border-2 border-purple-500 cursor-pointer"
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="text-center bg-zinc-900 border-purple-700 text-white max-w-xs">
          <p className="text-lg">{currentPhrase}</p>
        </DialogContent>
      </Dialog>

      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        Milord Portolomeus
      </h2>
      <p className="text-gray-400 text-center mb-4">
        CS Undergrad • Intern @Anabatic
      </p>

      {/* CV Download */}
      <motion.button
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-600/30"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Download CV
      </motion.button>
    </>
  );
}
