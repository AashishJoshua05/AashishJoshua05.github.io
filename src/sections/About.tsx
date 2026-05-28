import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "../components/ui/GradientText";
import SplitText from "../components/ui/SplitText";
import SpotlightCard from "../components/ui/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "1.5+", label: "Years Experience" },
  { value: "10K+", label: "Resumes/Day" },
  { value: "20%", label: "Token Reduction" },
  { value: "Sub-2s", label: "P95 Retrieval" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = statsRef.current?.querySelectorAll(".stat-card");
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#0a0a0a] section-padding"
    >
      <div className="container-custom">
        <div className="mb-16">
          <GradientText
            text="About"
            className="text-5xl md:text-6xl font-heading font-bold"
            from="#8B5CF6"
            to="#06b6d4"
            animate
          />
        </div>

        <div className="max-w-4xl mb-8">
          <SplitText
            text="Backend and AI engineer with 1.5+ years of production experience building scalable LLM systems. Built Hyrra — an agentic AI recruiter processing 10K+ resumes/day — at AidenAI, where I own the retrieval stack, ingestion pipeline, and multi-tenant backend."
            className="text-lg md:text-xl leading-relaxed text-[#e0e0e0]"
            splitBy="words"
            stagger={0.02}
            animateFrom={{ opacity: 0, y: 20 }}
            animateTo={{ duration: 0.4, ease: "power2.out" }}
          />
        </div>

        <div className="max-w-4xl mb-20">
          <SplitText
            text="I work across Python, FastAPI, Qdrant, PostgreSQL, and Azure, and am comfortable going from a system design conversation to shipping the thing."
            className="text-lg md:text-xl leading-relaxed text-light-dark"
            splitBy="words"
            stagger={0.02}
            delay={0.3}
            animateFrom={{ opacity: 0, y: 20 }}
            animateTo={{ duration: 0.4, ease: "power2.out" }}
          />
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <SpotlightCard
              key={stat.label}
              className="stat-card rounded-xl bg-dark-light/50 border border-[#1e1e1e] p-6 md:p-8 text-center"
            >
              <GradientText
                text={stat.value}
                className="text-3xl md:text-4xl font-heading font-bold block mb-2"
                from="#8B5CF6"
                to="#06b6d4"
              />
              <p className="text-sm text-light-muted">{stat.label}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
