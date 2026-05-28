import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.set(lettersRef.current, { y: 80, opacity: 0 });

    tl.to(lettersRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
    });

    tl.to(lettersRef.current, {
      scale: 1.1,
      duration: 0.4,
      ease: 'power2.inOut',
      delay: 0.3,
    });

    tl.to(lettersRef.current, {
      opacity: 0,
      scale: 1.3,
      duration: 0.3,
      ease: 'power2.in',
    });

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const name = 'AASHISH';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000,
      }}
    >
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        {name.split('').map((letter, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) lettersRef.current[i] = el;
            }}
            style={{
              display: 'inline-block',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 700,
              color: '#e0e0e0',
              letterSpacing: '0.1em',
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
