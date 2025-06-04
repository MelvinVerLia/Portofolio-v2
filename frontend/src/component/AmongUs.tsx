import React from "react";
import Particles from "@tsparticles/react";

export default function ChillParticles() {
  return (
    <Particles
      options={{
        particles: {
          number: { value: 80 },
          color: { value: "#00ffff" },
          size: { value: 4 },
          move: { enable: true, speed: 1 },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 1,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    />
  );
}
