import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMode } from '../context/ModeContext';

export default function PageSwoosh() {
  const wipeRef = useRef(null);
  const { transitionId, isTransitioning, commitPendingMode, finishModeTransition } = useMode();

  useEffect(() => {
    if (!isTransitioning || !transitionId || !wipeRef.current) return;

    const wipeEl = wipeRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        finishModeTransition();
      },
    });

    // Brutalist simple vertical wipe
    tl.set(wipeEl, { y: '100%', opacity: 1 });
    
    // Wipe up
    tl.to(wipeEl, { 
      y: '0%', 
      duration: 0.4, 
      ease: 'power4.inOut' 
    });
    
    // Swap content behind the wipe
    tl.call(() => commitPendingMode(), [], 0.4);
    
    // Hold briefly
    tl.to({}, { duration: 0.1 });

    // Wipe continues up and out
    tl.to(wipeEl, { 
      y: '-100%', 
      duration: 0.4, 
      ease: 'power4.inOut' 
    });

    tl.set(wipeEl, { opacity: 0 });

    return () => {
      tl.kill();
      gsap.set(wipeEl, { opacity: 0, y: '100%' });
    };
  }, [transitionId, isTransitioning, commitPendingMode, finishModeTransition]);

  return (
    <div
      ref={wipeRef}
      className="mode-wipe"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        pointerEvents: 'none',
        opacity: 0,
        background: 'var(--text)', /* Solid stark color for brutalist wipe */
        transform: 'translateY(100%)',
        willChange: 'transform',
      }}
    />
  );
}
