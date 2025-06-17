import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const konamiCode = ["ArrowUp", "ArrowUp"];

const AmongusParticles = () => {
  const [init, setInit] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  const [showEmitter, setShowEmitter] = useState(false);

  // Initialize tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Listen for Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiProgress]) {
        const nextProgress = konamiProgress + 1;
        if (nextProgress == konamiCode.length) {
          setShowEmitter(true);
          setTimeout(() => setShowEmitter(false), 20000);
          setKonamiProgress(0);
        } else {
          setKonamiProgress(nextProgress);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded:", container);
  };

  
  const options: ISourceOptions = useMemo(() => {
    const baseConfig: ISourceOptions = {
      background: {
        color: "transparent",
      },
      fpsLimit: 144,
      detectRetina: true,
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      particles: {
        groups: {
          z5000: { number: { value: 70 }, zIndex: { value: 5000 } },
          z7500: { number: { value: 30 }, zIndex: { value: 75 } },
          z2500: { number: { value: 50 }, zIndex: { value: 25 } },
          z1000: { number: { value: 40 }, zIndex: { value: 10 } },
        },
        number: {
          value: 300,
          // density: { enable: false, area: 800 },
        },
        color: {
          value: "#fff",
          animation: { enable: false },
        },
        shape: {
          type: "star",
        },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: { enable: false },
        },
        size: { value: 1.5 },
        move: {
          // angle: { value: 10 },
          enable: true,
          speed: 1,
          direction: "right",
          straight: true,
          outModes: "out",
        },
        zIndex: {
          value: -10,
          opacityRate: 0.5,
        },
      },
      interactivity: {
        events: {
          resize: {
            enable: true,
          },
        },
        modes: {
          grab: {
            distance: 1000,
            links: { opacity: 1 },
          },
          bubble: {
            distance: 400,
            size: 5,
            duration: 2,
            opacity: 0.8,
          },
          repulse: { distance: 50 },
          push: {
            quantity: 1,
            groups: ["z5000", "z7500", "z2500", "z1000"],
          },
          remove: { quantity: 2 },
        },
      },
    };

    return {
      ...baseConfig,
      emitters: showEmitter
        ? [
            {
              position: { x: -10, y: 50 },
              life: {
                count: 5, // Only once
                duration: 0.1, // How long it emits (in seconds)
                delay: 0, // Delay before emitting
              },
              size: { width: 30, height: 100 },
              direction: "right",
              particles: {
                shape: {
                  type: "images",
                  options: {
                    images: [
                      {
                        src: "https://particles.js.org/images/amongus_blue.png",
                        width: 265,
                        height: 265,
                      },
                      {
                        src: "https://particles.js.org/images/amongus_cyan.png",
                        width: 207,
                        height: 265,
                      },
                      {
                        src: "https://particles.js.org/images/amongus_green.png",
                        width: 204,
                        height: 266,
                      },
                      {
                        src: "https://particles.js.org/images/amongus_lime.png",
                        width: 206,
                        height: 267,
                      },
                      {
                        src: "https://particles.js.org/images/amongus_orange.png",
                        width: 205,
                        height: 265,
                      },
                      {
                        src: "https://particles.js.org/images/amongus_pink.png",
                        width: 205,
                        height: 265,
                      },
                      {
                        src: "https://particles.js.org/images/amongus_red.png",
                        width: 204,
                        height: 267,
                      },
                      {
                        src: "https://particles.js.org/images/amongus_white.png",
                        width: 205,
                        height: 267,
                      },
                    ],
                  },
                },
                opacity: { value: 2 },
                size: { value: 10 },
                move: {
                  speed: 5,
                  outModes: { default: "destroy", left: "none" },
                },
                zIndex: { value: 0 },
                rotate: {
                  value: { min: 0, max: 360 },
                  animation: { enable: true, speed: 4, sync: false },
                },
              },
            },
          ]
        : undefined,
    };
  }, [showEmitter]);

  if (!init) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Particles
        id="amongus-particles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};

export default AmongusParticles;
