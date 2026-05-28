import { useRef, useCallback, useEffect } from "react";

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  tolerance?: number;
}

const Magnet = ({
  children,
  className = "",
  strength = 0.3,
  tolerance = 100,
}: MagnetProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      const inner = innerRef.current;
      if (!wrapper || !inner) return;

      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < tolerance + Math.max(rect.width, rect.height) / 2) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          inner.style.transition = "transform 0.2s ease-out";
          inner.style.transform = `translate(${distX * strength}px, ${distY * strength}px)`;
        });
      }
    },
    [strength, tolerance]
  );

  const handleMouseLeave = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;

    cancelAnimationFrame(rafRef.current);
    inner.style.transition = "transform 0.5s ease-out";
    inner.style.transform = "translate(0px, 0px)";
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div ref={wrapperRef} className={`inline-block ${className}`}>
      <div ref={innerRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
};

export default Magnet;
