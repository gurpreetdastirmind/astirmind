import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12);
      dot.style.left = mouse.current.x + 'px';
      dot.style.top = mouse.current.y + 'px';
      ring.style.left = pos.current.x + 'px';
      ring.style.top = pos.current.y + 'px';
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1 });
      gsap.to(ring, { scale: 0.8, duration: 0.12 });
    };
    const onUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'back.out(3)' });
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
    };

    const getTargets = () =>
      document.querySelectorAll('a, button, [data-cursor], input, textarea, select, .card, .pill, .pill-ghost, .svc-card, .work-card');

    const attach = () => {
      getTargets().forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('cur-ring--hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('cur-ring--hover'));
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />
    </>
  );
}
