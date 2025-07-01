import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FabAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  bgColor?: string;
}

interface FabMenuProps {
  actions: FabAction[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export const FAB = ({ actions, position = "bottom-right" }: FabMenuProps) => {
  const [open, setOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the FAB to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fabRef.current &&
        !fabRef.current.contains(event.target as Node) &&
        open
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Position classes based on the specified position prop
  const posClass =
    position === "bottom-right"
      ? "bottom-4 right-4"
      : position === "bottom-left"
      ? "bottom-4 left-4"
      : position === "top-right"
      ? "top-4 right-4"
      : "top-4 left-4";

  // Determine if actions should appear toward the left or right
  const isRightSide = position === "bottom-right" || position === "top-right";
  // Determine if actions should appear toward the top or bottom
  const isBottomSide =
    position === "bottom-right" || position === "bottom-left";

  return (
    <div className={cn("fixed z-50", posClass)} ref={fabRef}>
      {/* Main FAB button */}
      <Button
        onClick={() => setOpen(!open)}
        className="rounded-full w-14 h-14 p-0 shadow-lg bg-purple-500 text-white hover:bg-purple-600 transition-all duration-500 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.5,
          }}
        >
          <Plus className="w-8 h-8" />
        </motion.div>
      </Button>

      {/* Action buttons */}
      <AnimatePresence>
        {open && (
          <div className="absolute inset-0 pointer-events-none">
            {actions.map((action, i) => {
              // Use your original getPosition logic
              const getPosition = () => {
                if (isRightSide) {
                  const positions = [
                    { x: -70, y: 0 },
                    { x: -60, y: isBottomSide ? -60 : 60 },
                    { x: 0, y: isBottomSide ? -70 : 70 },
                    { x: -50, y: isBottomSide ? -50 : 50 },
                  ];
                  return positions[i] || { x: -70 - (i - 3) * 60, y: 0 };
                } else {
                  const positions = [
                    { x: 70, y: 0 },
                    { x: 60, y: isBottomSide ? -60 : 60 },
                    { x: 0, y: isBottomSide ? -70 : 70 },
                    { x: 50, y: isBottomSide ? -50 : 50 },
                  ];
                  return positions[i] || { x: 70 + (i - 3) * 60, y: 0 };
                }
              };

              const { x, y } = getPosition(); // ← THIS LINE WAS MISSING

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="absolute pointer-events-auto"
                >
                  <div className="relative">
                    <button
                      onClick={() => {
                        action.onClick();
                        setOpen(false);
                      }}
                      className={cn(
                        "rounded-full w-12 h-12 flex items-center justify-center shadow-md cursor-pointer group",
                        action.bgColor || "bg-purple-400 hover:bg-purple-500",
                        "text-white transition-all duration-300"
                      )}
                    >
                      <action.icon className="w-6 h-6" />
                      <div
                        className={`absolute ${
                          isRightSide ? "right-14" : "left-14"
                        } top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none`}
                      >
                        {action.label}
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
