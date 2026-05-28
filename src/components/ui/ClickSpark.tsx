import { useRef, useCallback, useEffect } from "react";

interface ClickSparkProps {
  children: React.ReactNode;
  sparkCount?: number;
  sparkColor?: string;
  sparkSize?: number;
}

const ClickSpark = ({
  children,
  sparkCount = 8,
  sparkColor = "#8B5CF6",
  sparkSize = 6,
}: ClickSparkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkElements = useRef<HTMLDivElement[]>([]);

  const createSpark = useCallback(
    (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return;

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement("div");
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        const distance = 30 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        Object.assign(spark.style, {
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          width: `${sparkSize}px`,
          height: `${sparkSize}px`,
          borderRadius: "50%",
          backgroundColor: sparkColor,
          pointerEvents: "none",
          zIndex: "9999",
          transform: "translate(-50%, -50%) scale(1)",
          transition: "none",
        });

        container.appendChild(spark);
        sparkElements.current.push(spark);

        requestAnimationFrame(() => {
          Object.assign(spark.style, {
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease-out",
            transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
            opacity: "0",
          });
        });

        setTimeout(() => {
          if (spark.parentNode) {
            spark.parentNode.removeChild(spark);
          }
          sparkElements.current = sparkElements.current.filter((el) => el !== spark);
        }, 650);
      }
    },
    [sparkCount, sparkColor, sparkSize]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      createSpark(x, y);
    },
    [createSpark]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
      sparkElements.current.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      sparkElements.current = [];
    };
  }, [handleClick]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {children}
    </div>
  );
};

export default ClickSpark;
