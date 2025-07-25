import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles"; // You can swap to loadSlim, loadBasic, etc if needed

const AmongusParticles = () => {
  const [init, setInit] = useState(false);
  const [konamiEntered, setKonamiEntered] = useState(0);
  const [amongusParticles, setAmongusParticles] = useState(false);

  const konamiCode = ["ArrowUp", "ArrowUp"];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const expectedKey = konamiCode[konamiEntered];

      if (event.key === expectedKey) {
        const nextIndex = konamiEntered + 1;

        console.log(`Konami code progress: ${nextIndex}/${konamiCode.length}`);

        if (nextIndex === konamiCode.length) {
          console.log("Konami code entered!");
          const audio = new Audio("/sfx/boom.mp3");
          audio.play();
          setAmongusParticles(true);
          setKonamiEntered(0);
        } else {
          setKonamiEntered(nextIndex);
        }
      } else {
        setKonamiEntered(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiEntered]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded:", container);
  };

  // @ts-ignore
  const starOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: "transparent",
      },
      fpsLimit: 144,
      detectRetina: true,
      fullScreen: {
        enable: false,
      },
      particles: {
        groups: {
          z5000: { number: { value: 70 }, zIndex: { value: 13 } },
          z7500: { number: { value: 30 }, zIndex: { value: 12 } },
          z2500: { number: { value: 50 }, zIndex: { value: 11 } },
          z1000: { number: { value: 40 }, zIndex: { value: 10 } },
        },
        number: {
          value: 300,
          density: { enable: false, area: 800 },
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
          angle: { value: 10 },
          enable: true,
          speed: 1,
          direction: "right",
          random: false,
          straight: false,
          outModes: "out",
        },
        zIndex: {
          value: -10,
          opacityRate: 0.5,
        },
      },
      interactivity: {
        events: {
          // onHover: { enable: true, mode: "bubble" },
          // onClick: { enable: true, mode: "push" },
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
    }),
    []
  );

  // @ts-ignore
  const amongUsOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: "transparent",
      },
      fpsLimit: 144,
      detectRetina: true,
      fullScreen: {
        enable: false,
      },
      emitters: [
        {
          position: {
            x: -20,
            y: 50,
          },

          rate: { delay: 5, quantity: 1 },
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
              straight: true,
              enable: true,
            },
            rotate: {
              value: { min: 0, max: 360 },
              animation: { enable: true, speed: 4, sync: false },
            },
          },
        },
      ],
    }),
    []
  );

  if (!init) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Particles
        id="star-particles"
        particlesLoaded={particlesLoaded}
        options={starOptions}
        className="absolute inset-0 z-0"
      />

      {amongusParticles && (
        <Particles
          id="amongus-particles"
          particlesLoaded={particlesLoaded}
          options={amongUsOptions}
          className="absolute inset-0 z-10"
        />
      )}
    </div>
  );
};

export default AmongusParticles;
