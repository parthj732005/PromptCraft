import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppState, Role, PerformanceStats } from './types';
import IntroSequence from './components/IntroSequence';
import GateScreen from './components/GateScreen';
import MainInterface from './components/MainInterface';
import GameScreen from './components/GameScreen';
import RoleReveal from './components/RoleReveal';
import Scanlines from './components/Scanlines';
import CyberneticGridShader from './components/ui/cybernetic-grid-shader';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Intro);
  const [assignedRole, setAssignedRole] = useState<Role | null>(null);
  const [finalStats, setFinalStats] = useState<PerformanceStats | null>(null);

  const handleIntroComplete = useCallback(() => {
    setAppState(AppState.Gate);
  }, []);

  const handleBreach = useCallback(() => {
    setAppState(AppState.Main);
  }, []);

  const handleStartHacking = useCallback(() => {
    setAppState(AppState.Hacking);
  }, []);

  const handleHackingComplete = useCallback((role: Role, stats: PerformanceStats) => {
    setAssignedRole(role);
    setFinalStats(stats);
    setAppState(AppState.RoleReveal);
  }, []);
  
  const handleRestart = useCallback(() => {
    setAssignedRole(null);
    setFinalStats(null);
    setAppState(AppState.Main);
  }, []);


  return (
    <div className="min-h-screen w-full text-cyan-300 font-fira-code overflow-hidden relative">
      <CyberneticGridShader />
      <Scanlines />
      <div className="absolute top-4 right-4 z-50">
        <div className="flex items-center space-x-2 text-fuchsia-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M8.464 15.536a5 5 0 010-7.072" /></svg>
          <span className="font-orbitron text-sm">[MUTE]</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {appState === AppState.Intro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.5 }}
          >
            <IntroSequence onComplete={handleIntroComplete} />
          </motion.div>
        )}
        {appState === AppState.Gate && (
          <motion.div
            key="gate"
            initial={{ opacity: 0, filter: 'blur(5px)'}}
            animate={{ opacity: 1, filter: 'blur(0px)'}}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <GateScreen onBreach={handleBreach} />
          </motion.div>
        )}
        {appState === AppState.Main && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <MainInterface onStartHacking={handleStartHacking} />
          </motion.div>
        )}
        {appState === AppState.Hacking && (
           <motion.div
            key="hacking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <GameScreen onComplete={handleHackingComplete} />
          </motion.div>
        )}
        {appState === AppState.RoleReveal && assignedRole && finalStats && (
           <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <RoleReveal role={assignedRole} stats={finalStats} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;