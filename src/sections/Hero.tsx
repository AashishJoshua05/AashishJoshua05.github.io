import { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import ShinyText from "../components/ui/ShinyText";
import RotatingText from "../components/ui/RotatingText";
import Aurora from "../components/ui/Aurora";
import Magnet from "../components/ui/Magnet";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const LETTERS = "AASHISH".split("");

const generateScatter = () =>
  LETTERS.map(() => ({
    x: (Math.random() - 0.5) * 600,
    y: (Math.random() - 0.5) * 400,
    rotation: (Math.random() - 0.5) * 90,
  }));

const Hero = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const rotatingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const scatterValues = useMemo(() => generateScatter(), []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const section = sectionRef.current;
      if (!section) return;

      const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];

      letters.forEach((letter, i) => {
        gsap.set(letter, {
          x: scatterValues[i].x,
          y: scatterValues[i].y,
          rotation: scatterValues[i].rotation,
          scale: 3,
          opacity: 0,
        });
      });

      gsap.set(
        [
          subtitleRef.current,
          rotatingRef.current,
          ctaRef.current,
          socialsRef.current,
        ],
        { opacity: 0, y: 30 }
      );
      gsap.set(auroraRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=200%",
        },
      });

      // Phase 1: 0-30% — scroll indicator fades out, name letters animate in
      tl.to(
        scrollIndicatorRef.current,
        { opacity: 0, duration: 0.05, ease: "none" },
        0
      );

      letters.forEach((letter, i) => {
        tl.to(
          letter,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "power3.out",
          },
          0.02 + i * 0.02
        );
      });

      // Phase 2: 30-50% — subtitle and rotating text
      tl.to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.3
      );
      tl.to(
        rotatingRef.current,
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.35
      );

      // Phase 3: 50-75% — aurora, CTA buttons, socials
      tl.to(
        auroraRef.current,
        { opacity: 0.3, duration: 0.15, ease: "power2.inOut" },
        0.5
      );
      tl.to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.55
      );
      tl.to(
        socialsRef.current,
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.6
      );

      // Phase 4: 75-100% — everything fades out
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: -40,
          duration: 0.25,
          ease: "power2.in",
        },
        0.75
      );
      tl.to(
        auroraRef.current,
        { opacity: 0, duration: 0.2, ease: "power2.in" },
        0.8
      );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  if (reducedMotion) {
    return (
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]"
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="font-heading font-bold tracking-tight leading-none mb-6 text-[#e0e0e0]"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
          >
            AASHISH
          </h1>
          <div className="mb-4">
            <span className="text-xl md:text-2xl text-light-dark font-medium tracking-wide">
              AI Engineer &middot; LLM Systems &middot; Backend at Scale
            </span>
          </div>
          <div className="mb-12 h-10">
            <RotatingText
              texts={[
                "Building Hyrra at AidenAI",
                "10K+ Resumes/Day",
                "Sub-2s P95 Retrieval",
              ]}
              interval={3000}
              className="text-lg text-light-muted font-medium"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-12">
            <a
              href="#projects"
              className="px-8 py-3 border border-white/10 rounded-full text-[#e0e0e0] font-medium hover:bg-white/5 transition-colors duration-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-white/10 rounded-full text-[#e0e0e0] font-medium hover:bg-white/5 transition-colors duration-300"
            >
              Get In Touch
            </a>
          </div>
          <div className="flex gap-6 items-center">
            <a
              href="https://github.com/AashishJoshua05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-muted hover:text-light transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/aashish-joshua-james/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-muted hover:text-light transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] overflow-hidden"
    >
      <div ref={auroraRef} className="absolute inset-0 opacity-0 pointer-events-none">
        <Aurora
          colors={["#8B5CF6", "#06b6d4", "#7C3AED"]}
          speed={0.8}
          blur={100}
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <h1
          className="font-heading font-bold tracking-tight leading-none mb-6"
          style={{ fontSize: "clamp(4rem, 12vw, 10rem)", perspective: 600 }}
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el; }}
              className="inline-block text-[#e0e0e0]"
              style={{ willChange: "transform, opacity" }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <div ref={subtitleRef} className="mb-4">
          <ShinyText
            text="AI Engineer · LLM Systems · Backend at Scale"
            className="text-xl md:text-2xl text-light-dark font-medium tracking-wide"
            speed={4}
          />
        </div>

        <div ref={rotatingRef} className="mb-12 h-10">
          <RotatingText
            texts={[
              "Building Hyrra at AidenAI",
              "10K+ Resumes/Day",
              "Sub-2s P95 Retrieval",
            ]}
            interval={3000}
            className="text-lg text-light-muted font-medium"
          />
        </div>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 items-center mb-12"
        >
          <Magnet strength={0.2} tolerance={120}>
            <a
              href="#projects"
              className="px-8 py-3 border border-white/10 rounded-full text-[#e0e0e0] font-medium hover:bg-white/5 transition-colors duration-300"
            >
              View Projects
            </a>
          </Magnet>
          <Magnet strength={0.2} tolerance={120}>
            <a
              href="#contact"
              className="px-8 py-3 border border-white/10 rounded-full text-[#e0e0e0] font-medium hover:bg-white/5 transition-colors duration-300"
            >
              Get In Touch
            </a>
          </Magnet>
        </div>

        <div ref={socialsRef} className="flex gap-6 items-center">
          <a
            href="https://github.com/AashishJoshua05"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/aashish-joshua-james/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-xs uppercase tracking-widest text-white/30">
          Scroll
        </span>
        <motion.div
          className="w-px bg-white/30 origin-top"
          initial={{ height: 0 }}
          animate={{ height: [0, 32, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
