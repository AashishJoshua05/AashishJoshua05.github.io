import { useEffect, useRef, useState } from 'react';

interface CursorState {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef<CursorState>({ x: 0, y: 0 });
  const ringPos = useRef<CursorState>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');
  const rafId = useRef<number>(0);

  useEffect(() => {
    const isFineCursor = window.matchMedia('(pointer: fine)').matches;
    if (!isFineCursor) return;

    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (cursorAttr === 'text') {
        setCursorType('text');
      } else if (
        cursorAttr === 'pointer' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const animate = () => {
      const lerp = 0.15;
      ringPos.current.x += (cursorPos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (cursorPos.current.y - ringPos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cursorPos.current.x - 4}px, ${cursorPos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId.current);
      document.documentElement.style.cursor = '';
    };
  }, [visible]);

  const isFineCursor = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  if (!isFineCursor) return null;

  const dotScale = cursorType === 'pointer' ? 'scale(0.5)' : 'scale(1)';
  const ringScale = cursorType === 'pointer' ? 'scale(1.5)' : 'scale(1)';
  const ringBorder = cursorType === 'pointer' ? '1.5px solid #8B5CF6' : '1.5px solid rgba(224, 224, 224, 0.5)';

  const isText = cursorType === 'text';

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: '#e0e0e0',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, transform 0.05s linear',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            transform: dotScale,
            transition: 'transform 0.3s ease',
            backgroundColor: 'inherit',
          }}
        />
      </div>

      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isText ? 2 : 40,
          height: isText ? 32 : 40,
          borderRadius: isText ? 0 : '50%',
          border: isText ? 'none' : ringBorder,
          backgroundColor: isText ? '#8B5CF6' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, width 0.3s, height 0.3s, border 0.3s, border-radius 0.3s, background-color 0.3s',
          willChange: 'transform',
          transform: isText ? undefined : ringScale,
        }}
      />
    </>
  );
};

export default CustomCursor;
