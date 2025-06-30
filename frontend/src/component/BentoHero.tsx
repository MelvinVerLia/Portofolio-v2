import { motion } from "framer-motion";
import AvatarSection from "./AvatarSection";
import ToolSection from "./ToolSection";
import CertificateSection from "./CertificateSection";
import { useHeroContext } from "@/context/HeroContextProvider";

const BentoHero = () => {
  const { chatbot } = useHeroContext();
  return (
    <>
      {/* {!chatbot && (
        <div className="w-full relative z-10">
          <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-6">
            <motion.div
              className="row-span-2 bg-slate-800/50 rounded-2xl border border-purple-500/20 p-0 flex flex-col justify-center items-center"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AvatarSection />
            </motion.div>

            <motion.div
              className="bg-slate-800/50 rounded-2xl border border-purple-500/20 p-6 flex flex-col justify-center"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <CertificateSection />
            </motion.div>

            <motion.div
              className="row-span-2 bg-slate-800/50 rounded-2xl border border-purple-500/20 p-0 flex flex-col justify-center items-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AvatarSection />
            </motion.div>

            <motion.div
              className="bg-slate-800/50 rounded-2xl border border-purple-500/20 p-6 flex flex-col"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ToolSection />
            </motion.div>
          </div>
        </div>
      )} */}

      {!chatbot && (
        <div className="max-w-7xl w-full relative z-10">
          <div className="grid grid-cols-[1.5fr_2fr] gap-6">
            <motion.div
              className="row-span-2 bg-slate-800/50  rounded-2xl border border-purple-500/20 p-0 flex flex-col justify-center items-center"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AvatarSection />
            </motion.div>

            <motion.div
              className="bg-slate-800/50 rounded-2xl border border-purple-500/20 p-6 flex flex-col justify-center"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <CertificateSection />
            </motion.div>

            <motion.div
              className="bg-slate-800/50 rounded-2xl border border-purple-500/20 p-6 flex flex-col"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ToolSection />
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default BentoHero;
