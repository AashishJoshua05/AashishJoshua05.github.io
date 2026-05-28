import { useRef, useCallback, useState } from "react";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glare?: boolean;
  scale?: number;
}

const TiltedCard = ({
  children,
  className = "",
  tiltAmount = 15,
  glare = true,
  scale = 1.05,
}: TiltedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) scale(1)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      const rotateX = -percentY * tiltAmount;
      const rotateY = percentX * tiltAmount;

      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`);

      if (glare) {
        setGlarePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    },
    [tiltAmount, scale, glare]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
    setGlarePos({ x: 50, y: 50 });
  }, []);

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        className={`relative ${className}`}
        style={{
          transform,
          transition: isHovered
            ? "transform 0.1s ease"
            : "transform 0.5s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {glare && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: "inherit",
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25), transparent 60%)`,
              opacity: isHovered ? 1 : 0,
              transition: isHovered ? "opacity 0.1s ease" : "opacity 0.5s ease",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TiltedCard;
