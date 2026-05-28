import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Search, Server, Cloud, Code } from "lucide-react";
import SplitText from "../components/ui/SplitText";
import GradientText from "../components/ui/GradientText";
import SpotlightCard from "../components/ui/SpotlightCard";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  accent: string;
  colSpan?: string;
}

const categories: SkillCategory[] = [
  {
    title: "AI / LLMs",
    icon: <Brain size={20} />,
    skills: [
      "MCP",
      "LangChain",
      "LangGraph",
      "GPT-4o",
      "LLaMA",
      "Prompt Engineering",
      "Tool-use Orchestration",
      "Function Calling",
    ],
    accent: "#8B5CF6",
    colSpan: "md:col-span-2",
  },
  {
    title: "RAG & Search",
    icon: <Search size={20} />,
    skills: [
      "Qdrant (Multi-vector)",
      "FAISS",
      "Embedding Pipelines",
      "Hybrid Search",
      "LLM Re-ranking",
    ],
    accent: "#06b6d4",
  },
  {
    title: "Backend",
    icon: <Server size={20} />,
    skills: [
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "SSE",
    ],
    accent: "#10b981",
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud size={20} />,
    skills: [
      "Azure",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "OAuth2",
      "JWT",
      "Casbin RBAC",
    ],
    accent: "#f59e0b",
  },
  {
    title: "Frontend",
    icon: <Code size={20} />,
    skills: [
      "React",
      "Next.js",
      "TailwindCSS",
      "shadcn/ui",
      "Framer Motion",
      "GSAP",
    ],
    accent: "#ef4444",
  },
];

const topRowItems = [
  "Python",
  "TypeScript",
  "FastAPI",
  "Qdrant",
  "PostgreSQL",
  "LangChain",
  "LangGraph",
  "Docker",
  "Azure",
  "React",
];

const bottomRowItems = [
  "MCP",
  "Redis",
  "FAISS",
  "Next.js",
  "Tailwind",
  "Jenkins",
  "WebSockets",
  "OAuth2",
  "GPT-4o",
  "Alembic",
];

const sectionStyles = `
@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.gradient-line .split-item {
  background: linear-gradient(135deg, #8B5CF6, #06b6d4, #8B5CF6);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
}
`;

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const cards = gridRef.current?.querySelectorAll(".skill-card");
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const renderMarqueeRow = (
    items: string[],
    direction: "left" | "right",
    opacity: string
  ) => {
    const content = items.join(" · ");
    const animationName =
      direction === "left" ? "marquee-left" : "marquee-right";

    return (
      <div
        className="overflow-hidden whitespace-nowrap"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className={`inline-flex text-2xl md:text-3xl font-heading font-bold ${opacity}`}
          style={{
            animation: prefersReducedMotion
              ? "none"
              : `${animationName} 30s linear infinite`,
          }}
        >
          <span className="pr-8">{content}</span>
          <span className="pr-8">{content}</span>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" ref={sectionRef} className="section-padding">
      <style>{sectionStyles}</style>

      <div className="container-custom">
        <p className="text-sm uppercase tracking-widest text-light-muted mb-6">
          What I Do
        </p>

        <div className="mb-4">
          {prefersReducedMotion ? (
            <span className="text-5xl md:text-7xl font-heading font-bold text-light">
              I build
            </span>
          ) : (
            <SplitText
              text="I build"
              className="text-5xl md:text-7xl font-heading font-bold text-light"
              splitBy="words"
              delay={0}
            />
          )}
        </div>

        <div className="mb-4">
          {prefersReducedMotion ? (
            <GradientText
              className="text-5xl md:text-7xl font-heading font-bold"
              animate
            >
              LLM systems, RAG pipelines
            </GradientText>
          ) : (
            <div className="gradient-line">
              <SplitText
                text="LLM systems, RAG pipelines"
                className="text-5xl md:text-7xl font-heading font-bold"
                splitBy="words"
                delay={0.15}
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          {prefersReducedMotion ? (
            <span className="text-5xl md:text-7xl font-heading font-bold text-light">
              & agentic backends at scale.
            </span>
          ) : (
            <SplitText
              text="& agentic backends at scale."
              className="text-5xl md:text-7xl font-heading font-bold text-light"
              splitBy="words"
              delay={0.3}
            />
          )}
        </div>

        <p className="text-lg text-light-muted max-w-2xl mb-24">
          From system design to shipping. Python, FastAPI, Qdrant, PostgreSQL,
          Azure.
        </p>
      </div>

      <div className="mb-20 relative z-0 flex flex-col gap-3">
        {renderMarqueeRow(topRowItems, "left", "text-white/[0.08]")}
        {renderMarqueeRow(bottomRowItems, "right", "text-white/[0.05]")}
      </div>

      <div className="container-custom">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {categories.map((cat) => (
            <SpotlightCard
              key={cat.title}
              spotlightColor={`${cat.accent}1a`}
              className={`skill-card bg-[#111111] border border-white/5 rounded-2xl p-5 ${cat.colSpan ?? ""}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ color: cat.accent }}>{cat.icon}</span>
                <h3 className="text-base font-semibold text-light">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-white/10 rounded-md px-2.5 py-1 text-xs text-light-dark"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
