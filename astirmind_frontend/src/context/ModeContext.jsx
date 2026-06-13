import { createContext, useContext, useState, useCallback } from 'react';

/**
 * ModeContext — global agency / institute toggle
 *
 * mode: 'agency' | 'Training'
 * setMode: (newMode) => void
 * toggle: () => void
 */
const ModeContext = createContext(null);

export function ModeProvider({ children }) {
  const [mode, setModeState] = useState('Xperience');
  const [pendingMode, setPendingMode] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionId, setTransitionId] = useState(0);

  const setMode = useCallback((m) => setModeState(m), []);
  const toggle = useCallback(() => setModeState(m => m === 'Xperience' ? 'Training' : 'agency'), []);

  const startModeTransition = useCallback((nextMode) => {
    if (!nextMode || nextMode === mode || isTransitioning) return false;
    setPendingMode(nextMode);
    setIsTransitioning(true);
    setTransitionId(v => v + 1);
    return true;
  }, [mode, isTransitioning]);

  const commitPendingMode = useCallback(() => {
    setModeState(prev => (pendingMode ?? prev));
  }, [pendingMode]);

  const finishModeTransition = useCallback(() => {
    setPendingMode(null);
    setIsTransitioning(false);
  }, []);

  return (
    <ModeContext.Provider value={{
      mode,
      setMode,
      toggle,
      pendingMode,
      isTransitioning,
      transitionId,
      startModeTransition,
      commitPendingMode,
      finishModeTransition,
    }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used inside ModeProvider');
  return ctx;
}
