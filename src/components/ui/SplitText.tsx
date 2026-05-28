import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "chars" | "words";
  animateFrom?: gsap.TweenVars;
  animateTo?: gsap.TweenVars;
  stagger?: number;
  trigger?: boolean;
}

const SplitText = ({
  text,
  className = "",
  delay = 0,
  splitBy = "chars",
  animateFrom = { opacity: 0, y: 40, rotateX: -90 },
  animateTo = {},
  stagger = 0.03,
  trigger = true,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const items =
    splitBy === "words"
      ? text.split(" ")
      : text.split("");

  useGSAP(
    () => {
      const targets = containerRef.current?.querySelectorAll(".split-item");
      if (!targets?.length) return;

      const toVars: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger,
        delay,
        duration: 0.6,
        ease: "power3.out",
        ...animateTo,
      };

      if (trigger) {
        toVars.scrollTrigger = {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        };
      }

      gsap.fromTo(targets, animateFrom, toVars);
    },
    { scope: containerRef, dependencies: [text, splitBy, trigger] }
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ perspective: 400, display: "inline" }}
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="split-item"
          style={{
            display: "inline-block",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          {item === " " ? " " : item}
          {splitBy === "words" && i < items.length - 1 ? " " : ""}
        </span>
      ))}
    </div>
  );
};

export default SplitText;
