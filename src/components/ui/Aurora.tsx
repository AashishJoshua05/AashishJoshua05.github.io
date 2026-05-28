import { useMemo } from "react";

interface AuroraProps {
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
}

const blobKeyframes = [
  `@keyframes aurora-float-0 {
    0%, 100% { transform: translate(0%, 0%) scale(1) rotate(0deg); }
    25% { transform: translate(10%, -15%) scale(1.1) rotate(45deg); }
    50% { transform: translate(-5%, 10%) scale(0.95) rotate(90deg); }
    75% { transform: translate(-10%, -5%) scale(1.05) rotate(135deg); }
  }`,
  `@keyframes aurora-float-1 {
    0%, 100% { transform: translate(0%, 0%) scale(1) rotate(0deg); }
    33% { transform: translate(-15%, 10%) scale(1.15) rotate(-60deg); }
    66% { transform: translate(10%, -10%) scale(0.9) rotate(60deg); }
  }`,
  `@keyframes aurora-float-2 {
    0%, 100% { transform: translate(0%, 0%) scale(1) rotate(0deg); }
    20% { transform: translate(15%, 10%) scale(1.1) rotate(30deg); }
    40% { transform: translate(-10%, 15%) scale(0.95) rotate(-45deg); }
    60% { transform: translate(-15%, -10%) scale(1.05) rotate(60deg); }
    80% { transform: translate(5%, -15%) scale(1.1) rotate(-30deg); }
  }`,
];

const Aurora = ({
  className = "",
  colors = ["#8B5CF6", "#06b6d4", "#8B5CF6"],
  speed = 1,
  blur = 80,
}: AuroraProps) => {
  const blobs = useMemo(
    () =>
      colors.map((color, i) => ({
        style: {
          position: "absolute" as const,
          width: `${50 + i * 10}%`,
          height: `${50 + i * 10}%`,
          top: `${10 + i * 15}%`,
          left: `${10 + ((i * 25) % 60)}%`,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          filter: `blur(${blur}px)`,
          mixBlendMode: "screen" as const,
          animation: `aurora-float-${i % 3} ${(8 + i * 4) / speed}s ease-in-out infinite`,
          willChange: "transform",
        },
      })),
    [colors, speed, blur]
  );

  const styleTag = useMemo(
    () => blobKeyframes.slice(0, Math.min(colors.length, 3)).join("\n"),
    [colors.length]
  );

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        opacity: 0.3,
        pointerEvents: "none",
      }}
    >
      <style>{styleTag}</style>
      {blobs.map((blob, i) => (
        <div key={i} style={blob.style} />
      ))}
    </div>
  );
};

export default Aurora;
