import { type ReactNode, type CSSProperties } from "react";

interface GradientTextProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  from?: string;
  to?: string;
  animate?: boolean;
}

const GradientText = ({
  text,
  children,
  className = "",
  from = "#8B5CF6",
  to = "#06b6d4",
  animate = false,
}: GradientTextProps) => {
  const content = text ?? children;

  const baseStyle: CSSProperties = {
    background: `linear-gradient(135deg, ${from}, ${to}${animate ? `, ${from}` : ""})`,
    backgroundSize: animate ? "200% 200%" : "100% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    display: "inline-block",
    ...(animate && {
      animation: "gradient-shift 4s ease infinite",
    }),
  };

  return (
    <span className={className} style={baseStyle}>
      {animate && (
        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      )}
      {content}
    </span>
  );
};

export default GradientText;
