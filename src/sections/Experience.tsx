import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GradientText from "../components/ui/GradientText";
import SpotlightCard from "../components/ui/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  title: string;
  company: string;
  period: string;
  subtitle: string;
  achievements: string[];
  tech: string[];
}

const timeline: TimelineEntry[] = [
  {
    title: "Product Engineer",
    company: "AidenAI",
    period: "Nov 2024 - Present",
    subtitle: "Promoted from Intern · Hyderabad, India",
    achievements: [
      "Built resume ingestion pipeline on Azure Databricks processing 10K+ resumes/day",
      "Designed multi-agent system on MCP with 6 personas sharing a single tool server",
      "Built candidate ranking engine on Qdrant with sub-2-second P95 retrieval",
      "Implemented PostgreSQL multi-tenancy using schema-per-tenant isolation",
    ],
    tech: [
      "Python",
      "FastAPI",
      "Qdrant",
      "PostgreSQL",
      "Azure",
      "Docker",
      "MCP",
      "LangChain",
    ],
  },
  {
    title: "Product Engineer Intern",
    company: "AidenAI",
    period: "Aug 2024 - Oct 2024",
    subtitle: "Converted to full-time after 3-month internship · Remote",
    achievements: [
      "Conducted POCs across AI tools and frameworks to evaluate LLM integration options",
      "Rebuilt frontend in React with code-splitting, lazy loading — Lighthouse 72 to 96",
    ],
    tech: ["React", "Tailwind", "TypeScript"],
  },
  {
    title: "B.Tech in AI",
    company: "Mahindra University",
    period: "Aug 2020 - May 2024",
    subtitle: "Coursework: ML, Deep Learning, NLP, DSA, Distributed Systems",
    achievements: [],
    tech: [],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (timelineContainerRef.current) {
        setLineHeight(timelineContainerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useGSAP(
    () => {
      const line = lineRef.current;
      if (!line || lineHeight === 0) return;

      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".timeline-card");
      cards?.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -80 : 80 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const dots = sectionRef.current?.querySelectorAll<HTMLElement>(".timeline-dot");
      dots?.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const glowDots = sectionRef.current?.querySelectorAll<HTMLElement>(".dot-glow");
      glowDots?.forEach((glow) => {
        gsap.fromTo(
          glow,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: glow,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [lineHeight] }
  );

  return (
    <section id="experience" ref={sectionRef} className="section-padding relative">
      <div className="container-custom">
        <div className="text-center mb-20">
          <GradientText className="text-5xl md:text-6xl font-bold font-heading">
            Experience
          </GradientText>
        </div>

        <div className="relative" ref={timelineContainerRef}>
          <svg
            className="absolute left-4 md:left-1/2 top-0 w-[2px] md:-translate-x-[1px] pointer-events-none"
            style={{ height: lineHeight || "100%" }}
            viewBox={`0 0 2 ${lineHeight || 1}`}
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d={`M1,0 L1,${lineHeight || 1}`}
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <div className="space-y-16 md:space-y-24">
            {timeline.map((entry, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div key={entry.period} className="relative">
                  <div
                    className={`absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10`}
                  >
                    <div className="timeline-dot relative w-4 h-4 rounded-full bg-primary border-2 border-dark">
                      <div className="dot-glow absolute inset-[-6px] rounded-full bg-primary/30 blur-sm opacity-0" />
                    </div>
                  </div>

                  <div
                    className={`timeline-card pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${
                      isLeft
                        ? "md:mr-auto md:pr-8"
                        : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <SpotlightCard
                      className="rounded-xl bg-dark-light/60 backdrop-blur-sm p-6 md:p-8 border border-white/5"
                      spotlightColor="rgba(139, 92, 246, 0.12)"
                      borderColor="rgba(139, 92, 246, 0.3)"
                    >
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">
                            {entry.title}
                          </h3>
                          <p className="text-primary font-medium mt-1">
                            {entry.company}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-light-muted">
                          <span>{entry.period}</span>
                          <span className="w-1 h-1 rounded-full bg-light-muted" />
                          <span>{entry.subtitle}</span>
                        </div>

                        {entry.achievements.length > 0 && (
                          <ul className="space-y-2">
                            {entry.achievements.map((item, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2 text-light-dark text-sm leading-relaxed"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {entry.tech.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {entry.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-0.5 text-xs font-medium border border-white/10 rounded-full text-light-muted"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </SpotlightCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
