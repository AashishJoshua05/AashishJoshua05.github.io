import { memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const BackgroundAnimation = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    if (!init) {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
        console.log("Loading Particles");
      }).then(() => {
        console.log("Particles loaded");
        setInit(true);
      });
    }
  }, [init]);
  
  const particlesLoaded = useCallback(async () => {
    console.log("Particles have loaded successfully");
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-light/20 to-dark opacity-80 pointer-events-none"></div>
      
      {/* Floating Particles using tsparticles */}
      <div className="pointer-events-auto">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          className="w-full h-full"
          options={{
            fullScreen: { enable: false, zIndex: 0 },
            particles: {
              number: {
                value: 80,
                density: { enable: true },
              },
              color: { value: ["#ffffff", "#915EFF", "#1E1E2E"] },
              shape: { type: "circle" },
              opacity: {
                value: { min: 0.8, max: 1 },
              },
              size: {
                value: { min: 1, max: 5 },
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "out" },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: false }, // Disabled click interactivity
              },
              modes: {
                repulse: { distance: 100 },
              },
            },
          }}
        />
      </div>

      {/* Grid lines */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #8B5CF6 1px, transparent 1px), linear-gradient(to bottom, #8B5CF6 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        animate={{
          y: [0, 0],
        }}
      />
    </div>
  );
};

export default memo(BackgroundAnimation);