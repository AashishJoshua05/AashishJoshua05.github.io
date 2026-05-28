import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "../components/ui/SplitText";
import GradientText from "../components/ui/GradientText";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  metric: string;
  metricLabel: string;
  gradientFrom: string;
  gradientTo: string;
}

const projects: Project[] = [
  {
    title: "Resume Ingestion Pipeline",
    category: "AI · Data Pipeline",
    description:
      "Built on Azure Databricks processing resumes at scale with watermark-based incremental discovery — cut re-processing by 65% and manual sourcing by 80%.",
    tech: ["Python", "Azure Databricks", "PostgreSQL", "Qdrant"],
    metric: "10K+",
    metricLabel: "resumes processed daily",
    gradientFrom: "#8B5CF6",
    gradientTo: "#6366f1",
  },
  {
    title: "Multi-Agent System on MCP",
    category: "AI · Architecture",
    description:
      "Designed so all 6 personas share a single tool server. Eliminated cross-persona context bleed and cut average LLM token usage by 20%.",
    tech: ["Python", "MCP", "LangChain", "LangGraph", "FastAPI"],
    metric: "6",
    metricLabel: "AI personas, one tool server",
    gradientFrom: "#06b6d4",
    gradientTo: "#8B5CF6",
  },
  {
    title: "Candidate Ranking Engine",
    category: "AI · Search & Retrieval",
    description:
      "Built on Qdrant with four embedding vectors and LLM re-ranking — delivering real-time retrieval at ~50 concurrent tenant queries.",
    tech: ["Python", "Qdrant", "FastAPI", "LLM Re-ranking"],
    metric: "<2s",
    metricLabel: "P95 retrieval latency",
    gradientFrom: "#f59e0b",
    gradientTo: "#ef4444",
  },
  {
    title: "Cinematic Portfolio",
    category: "Frontend · Design",
    description:
      "Scroll-driven animations, custom cursor, horizontal scroll, smooth transitions, and grain overlays — built to feel like an experience, not a page.",
    tech: ["React", "GSAP", "Tailwind", "TypeScript", "Framer Motion"],
    metric: "∞",
    metricLabel: "scroll-driven animations",
    gradientFrom: "#10b981",
    gradientTo: "#06b6d4",
  },
];

const ReducedMotionFallback = () => (
  <section id="projects" className="bg-dark">
    <div className="max-w-4xl mx-auto px-6">
      <div className="py-24 border-b border-white/5">
        <span className="text-xs uppercase tracking-[0.3em] text-white/30">
          Selected Work
        </span>
      </div>
      {projects.map((project, i) => (
        <div key={project.title} className="py-32 border-b border-white/5">
          <span className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6 block">
            {project.category}
          </span>
          <h3 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-8">
            {project.title}
          </h3>
          <div className="w-16 h-px bg-white/10 mb-8" />
          <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-10 max-w-xl">
            {project.description}
          </p>
          <div className="flex items-baseline gap-4 mb-10">
            <GradientText
              className="text-5xl md:text-6xl font-heading font-bold"
              from={project.gradientFrom}
              to={project.gradientTo}
            >
              {project.metric}
            </GradientText>
            <span className="text-lg text-white/30">{project.metricLabel}</span>
          </div>
          <div className="text-xs uppercase tracking-wider text-white/20">
            {project.tech.join(" / ")}
          </div>
          <div className="mt-4 text-xs text-white/10">
            {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Projects = () => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const slides = track.querySelectorAll<HTMLElement>(".project-slide");
      const totalDistance = (slides.length - 1) * window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=" + slides.length * window.innerWidth,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.round(self.progress * (slides.length - 1)),
              slides.length - 1
            );
            setActiveIndex(idx);
            if (counterRef.current) {
              counterRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
          },
        },
      });

      tl.to(track, {
        x: -totalDistance,
        ease: "none",
      });

      slides.forEach((slide) => {
        const category = slide.querySelector(".slide-category");
        const titleWrap = slide.querySelector(".slide-title");
        const line = slide.querySelector(".slide-line");
        const desc = slide.querySelector(".slide-desc");
        const metric = slide.querySelector(".slide-metric");
        const techStack = slide.querySelector(".slide-tech");

        if (category) {
          gsap.fromTo(
            category,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: "left 75%",
                end: "left 55%",
                scrub: 1,
              },
            }
          );
        }

        if (titleWrap) {
          gsap.fromTo(
            titleWrap,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: "left 72%",
                end: "left 50%",
                scrub: 1,
              },
            }
          );
        }

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: "left 65%",
                end: "left 45%",
                scrub: 1,
              },
            }
          );
        }

        if (desc) {
          gsap.fromTo(
            desc,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: "left 60%",
                end: "left 40%",
                scrub: 1,
              },
            }
          );
        }

        if (metric) {
          gsap.fromTo(
            metric,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: "left 55%",
                end: "left 35%",
                scrub: 1,
              },
            }
          );
        }

        if (techStack) {
          gsap.fromTo(
            techStack,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: "left 50%",
                end: "left 30%",
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  if (reducedMotion) return <ReducedMotionFallback />;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-dark overflow-hidden"
    >
      <div className="absolute top-8 left-0 right-0 z-20 px-8 md:px-16 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-white/30">
          Selected Work
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-white/30">
          <span ref={counterRef} className="text-white/50">01</span>
          {" — "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div
        ref={trackRef}
        className="flex h-screen"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="project-slide relative flex-shrink-0 w-screen h-screen flex items-center"
          >
            <span
              className="absolute -top-6 -left-4 text-[200px] md:text-[280px] font-heading font-bold leading-none select-none pointer-events-none"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.06)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-3xl">
              <span className="slide-category text-xs uppercase tracking-[0.3em] text-white/30 mb-6 block opacity-0">
                {project.category}
              </span>

              <div className="slide-title mb-8 opacity-0">
                <SplitText
                  text={project.title}
                  className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight"
                  splitBy="words"
                  stagger={0.05}
                  trigger={false}
                  animateFrom={{ opacity: 1, y: 0 }}
                  animateTo={{}}
                />
              </div>

              <div
                className="slide-line w-16 h-px bg-white/10 mb-8 origin-left"
                style={{ transform: "scaleX(0)" }}
              />

              <p className="slide-desc text-lg md:text-xl text-white/50 leading-relaxed mb-10 max-w-xl opacity-0">
                {project.description}
              </p>

              <div className="slide-metric flex items-baseline gap-4 mb-10 opacity-0">
                <GradientText
                  className="text-5xl md:text-6xl font-heading font-bold"
                  from={project.gradientFrom}
                  to={project.gradientTo}
                >
                  {project.metric}
                </GradientText>
                <span className="text-lg text-white/30">{project.metricLabel}</span>
              </div>

              <div className="slide-tech text-xs uppercase tracking-wider text-white/20 opacity-0">
                {project.tech.join(" / ")}
              </div>
            </div>

            <span
              className="absolute bottom-12 right-8 text-xs uppercase tracking-[0.5em] text-white/10 select-none pointer-events-none"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              SCROLL &rarr;
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
