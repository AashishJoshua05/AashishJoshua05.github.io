import { useEffect, useRef } from 'react';

const GrainOverlay = () => {
  const seedRef = useRef(0);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    let lastTime = 0;
    const interval = 100;

    const animate = (time: number) => {
      if (time - lastTime > interval) {
        seedRef.current = (seedRef.current + 1) % 10;
        if (turbulenceRef.current) {
          turbulenceRef.current.setAttribute('seed', String(seedRef.current));
        }
        lastTime = time;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.05,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            seed="0"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
};

export default GrainOverlay;
