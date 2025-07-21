import { useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const CertificateSection = () => {
  const [currentCert, setCurrentCert] = useState(0);
  const [currentCertDetail, setCurrentCertDetail] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initialLoad, setInitialLoad] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>("right");

  const progressInterval = 100;

  const certificates = [
    {
      id: 1,
      date: "2024",
      credentialId: "META-REACT-2024-1837",
      image: "../author.png",
      issuer: "ICIMCIS",
      description:
        "Completed Meta's React Developer course covering hooks, component architecture, state management, and performance optimizations. Built real-world projects and passed all assessments.",
      proof: "https://ieeexplore.ieee.org/abstract/document/10957360",
    },
    {
      id: 2,
      date: "2024",
      credentialId: "FCC-FSD-2023-8273",
      image: "../presenter.png",
      issuer: "ICIMCIS",
      description:
        "Earned by completing over 300 hours of coding challenges, building full stack projects with MongoDB, Express, React, and Node. Covered backend APIs, frontend UI, and database integration.",
      proof: "https://ieeexplore.ieee.org/abstract/document/10957360",
    },
  ];

  useEffect(() => {
    if (isDialogOpen) return;

    const step = (progressInterval / 10000) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          nextCert();
          return 0;
        }
        return prev + step;
      });
    }, progressInterval);
    return () => clearInterval(interval);
  }, [isDialogOpen]);

  useEffect(() => {
    setCurrentCertDetail(currentCert);
    setInitialLoad(true);
    setDirection(null);
  }, [isDialogOpen]);

  const nextCertDetails = () => {
    setDirection("right");
    setInitialLoad(false);
    setTimeout(() => {
      setCurrentCertDetail((prev) => (prev + 1) % certificates.length);
    }, 0);
  };

  const prevCertDetails = () => {
    setDirection("left");
    setInitialLoad(false);
    setTimeout(() => {
      setCurrentCertDetail(
        (prev) => (prev - 1 + certificates.length) % certificates.length
      );
    }, 0);
  };
  const nextCert = () => {
    setCurrentCert((prev) => (prev + 1) % certificates.length);
    setProgress(0);
  };

  const prevCert = () => {
    setCurrentCert(
      (prev) => (prev - 1 + certificates.length) % certificates.length
    );
    setProgress(0);
  };

  const currentCertificate = certificates[currentCert];
  const currentCertificateDetail = certificates[currentCertDetail];

  return (
    <motion.div className="w-full h-full flex flex-col">
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Award className="text-purple-400 w-5 h-5 mr-2" />
          </motion.div>
          <h3 className="text-white font-semibold text-lg">Certificates</h3>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={prevCert}
            className="p-1 rounded bg-slate-700/50 hover:bg-slate-600/50 text-white transition-colors hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.div>
            <motion.span
              className="text-sm text-gray-400"
              key={currentCert}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentCert + 1}
            </motion.span>
            <span className="text-sm text-gray-400">
              /{certificates.length}
            </span>
          </motion.div>

          <motion.button
            onClick={nextCert}
            className="p-1 rounded bg-slate-700/50 hover:bg-slate-600/50 text-white transition-colors hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ChevronRight className="w-5 h-5 " />
          </motion.button>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCert}
            className="relative mb-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (open) setProgress(0);
              }}
            >
              <DialogTrigger asChild>
                <motion.div
                  className="cursor-pointer relative overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="relative w-full h-60 rounded-lg overflow-hidden">
                    <motion.img
                      src={currentCertificate.image}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
                      <motion.div
                        className="h-full bg-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{
                          duration: progressInterval / 1000,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </div>
                  <motion.div
                    className="absolute top-2 right-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {currentCertificate.date}
                    </span>
                  </motion.div>

                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="text-white text-sm bg-black/50 px-3 py-1 rounded-4xl font-normal flex justify-center items-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Certificate Details
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </DialogTrigger>

              <DialogContent className="max-w-5xl p-0 border-none bg-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCertificateDetail.id}
                    initial={{
                      opacity: 0,
                      scale: initialLoad ? 0 : 1,
                      x: initialLoad ? 0 : direction === "right" ? -200 : 200,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1,
                      x: direction === "right" ? 200 : -200,
                    }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-gradient-to-br from-slate-900/98 to-slate-800/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl"
                  >
                    <div className="bg-gradient-to-br from-slate-900/98 to-slate-800/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
                      <motion.div className="relative">
                        <AnimatePresence>
                          <motion.img
                            src={currentCertificateDetail.image}
                            alt="Certificate"
                            className="w-full h-auto object-cover"
                          />
                        </AnimatePresence>
                      </motion.div>

                      <motion.button
                        onClick={nextCertDetails}
                        whileHover={{ cursor: "pointer" }}
                        className="absolute right-2 top-1/2 flex justify-center items-center transform -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white  group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
                      >
                        <ChevronRight className="w-7 h-7 " />
                      </motion.button>

                      <motion.button
                        onClick={prevCertDetails}
                        whileHover={{ cursor: "pointer" }}
                        className="absolute left-2 top-1/2 flex justify-center items-center transform -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white  group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
                      >
                        <ChevronLeft className="w-7 h-7" />
                      </motion.button>

                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex items-center space-x-4 text-purple-400 font-bold">
                            <span className="flex items-center">
                              <Award className="w-4 h-4 mr-2" />
                              {currentCertificateDetail.issuer}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span>{currentCertificateDetail.date}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-base">
                          {currentCertificateDetail.description}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                          <div className="text-sm text-gray-400">
                            <span className="font-medium">Credential ID: </span>
                            <span className="font-mono text-gray-300 bg-slate-800/50 px-2 py-1 rounded">
                              {currentCertificateDetail.credentialId}
                            </span>
                          </div>
                          <button
                            className="flex items-center justify-center text-purple-400 hover:text-purple-300 font-bold text-sm transition-all duration-300 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-2 rounded-full border border-purple-500/30 hover:cursor-pointer"
                            onClick={() =>
                              window.open(currentCertificateDetail.proof)
                            }
                          >
                            <ExternalLink className="w-4 h-4 mr-2 transition-transform duration-300" />
                            <div>Verify Certificate</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </DialogContent>
            </Dialog>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="flex justify-center space-x-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {certificates.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentCert(index);
              setProgress(0);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentCert
                ? "bg-purple-500"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            animate={{
              scale: index === currentCert ? 1.2 : 1,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CertificateSection;
