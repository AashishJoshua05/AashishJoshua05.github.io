interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const ShinyText = ({ text, className = "", speed = 3 }: ShinyTextProps) => {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        background: `linear-gradient(
          120deg,
          currentColor 0%,
          currentColor 35%,
          rgba(255, 255, 255, 0.9) 50%,
          currentColor 65%,
          currentColor 100%
        )`,
        backgroundSize: "250% 100%",
        backgroundPosition: "100% 0",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `shiny-sweep ${speed}s ease-in-out infinite`,
      }}
    >
      <style>{`
        @keyframes shiny-sweep {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
      {text}
    </span>
  );
};

export default ShinyText;
