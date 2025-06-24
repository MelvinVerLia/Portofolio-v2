import { motion } from "framer-motion";
import AnnoyingAvatar from "./AnnoyingAvatar";
import Tools from "./Tools";

const BentoHero = () => {
  return (
    <>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-[750px]">
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-0 flex flex-col justify-center items-center h-full w-[500px]"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnnoyingAvatar />
          </motion.div>

          {/* Top Right - Simple Info */}
          <motion.div
            className="md:col-span-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 flex flex-col justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ height: "275px" }}
          >
            idk what to put here
          </motion.div>

          {/* Bottom Right - Tools Showcase - Now matches left box height */}
          <motion.div
            className="md:col-span-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ height: "calc(750px - 275px - 24px)" }} // Total height minus top box minus gap
          >
            <Tools />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BentoHero;
