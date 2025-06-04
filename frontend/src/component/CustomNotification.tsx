import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

interface CustomNotificationProps {
  isVisible: boolean;
  type?: "success" | "error";
  message: string;
  onClose: () => void;
}

const CustomNotification: React.FC<CustomNotificationProps> = ({
  isVisible,
  type,
  message,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const bgColor =
    type === "success"
      ? "from-purple-600 to-pink-500"
      : "from-red-600 to-pink-500";

  const icon =
    type === "success" ? (
      <CheckCircle className="w-6 h-6 text-white" />
    ) : (
      <XCircle className="w-6 h-6 text-white" />
    );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-[#1a1a2e] border border-purple-800/50 shadow-lg shadow-purple-800/20 px-4 py-3 rounded-lg max-w-md"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <div className={`p-2 rounded-full bg-gradient-to-r ${bgColor}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white">
              {type === "success" ? "Success!" : "Error"}
            </h4>
            <p className="text-sm text-gray-300">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${bgColor} rounded-b-lg`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomNotification;
