import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Role, PerformanceStats, GameStatus } from '../types';
import { COMMAND_SEQUENCES, TOTAL_ROUNDS, ROUND_TIME_SECONDS, getRoleForStats } from '../constants';
import GlitchText from './GlitchText';

interface HackingTerminalProps {
  onComplete: (role: Role, stats: PerformanceStats) => void;
}

const HackingTerminal: React.FC<HackingTerminalProps> = ({ onComplete }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [command, setCommand] = useState('');
  const [typedCommand, setTypedCommand] = useState('');
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME_SECONDS);
  const [status, setStatus] = useState<GameStatus>(GameStatus.Ready);
  const [mistakes, setMistakes] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [roundStats, setRoundStats] = useState<{ time: number; mistakes: number; commandLength: number }[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  // Fix: The return type of setInterval in the browser is `number`, not `NodeJS.Timeout`.
  // FIX: Initialize useRef with `undefined` because it expects an initial value.
  const timerRef = useRef<number | undefined>(undefined);
  const roundStartTimeRef = useRef<number>(0);

  const startRound = useCallback(() => {
    if (currentRound >= TOTAL_ROUNDS) {
      setStatus(GameStatus.Finished);
      return;
    }
    const newCommand = COMMAND_SEQUENCES[currentRound][Math.floor(Math.random() * COMMAND_SEQUENCES[currentRound].length)];
    setCommand(newCommand);
    setTypedCommand('');
    setTimeLeft(ROUND_TIME_SECONDS);
    setMistakes(0);
    setStatus(GameStatus.InProgress);
    roundStartTimeRef.current = Date.now();
  }, [currentRound]);

  useEffect(() => {
    if (status === GameStatus.InProgress) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setStatus(GameStatus.Failed);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (status === GameStatus.Success || status === GameStatus.Failed) {
        setTimeout(() => {
          setCurrentRound(prev => prev + 1);
        }, 2000);
      }
    }
    return () => {
      if(timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  useEffect(() => {
    if (currentRound > 0 && currentRound <= TOTAL_ROUNDS) {
      startRound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound]);
  
  useEffect(() => {
      if(status === GameStatus.Finished) {
          const totalTime = roundStats.reduce((acc, s) => acc + s.time, 0);
          const totalChars = roundStats.reduce((acc, s) => acc + s.commandLength, 0);
          const totalMistakes = roundStats.reduce((acc, s) => acc + s.mistakes, 0);

          const avgSpeed = totalTime > 0 ? totalChars / totalTime : 0;
          const accuracy = totalChars > 0 ? Math.max(0, ((totalChars - totalMistakes) / totalChars) * 100) : 100;
          
          const finalStats: PerformanceStats = {
              accuracy: parseFloat(accuracy.toFixed(2)),
              avgSpeed: parseFloat(avgSpeed.toFixed(2)),
              mistakes: totalMistakes
          };

          const assignedRole = getRoleForStats(finalStats);
          onComplete(assignedRole, finalStats);
      }
  }, [status, roundStats, onComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status !== GameStatus.InProgress) return;
    const value = e.target.value;
    
    if (value.length < typedCommand.length) { // Backspace
      setTypedCommand(value);
      return;
    }
    
    const lastChar = value.slice(-1);
    const expectedChar = command[value.length - 1];

    if(lastChar !== expectedChar) {
      setMistakes(m => m + 1);
      setTotalMistakes(tm => tm + 1);
    }

    setTypedCommand(value);

    if (value === command) {
      const timeTaken = (Date.now() - roundStartTimeRef.current) / 1000;
      setRoundStats(prev => [...prev, { time: timeTaken, mistakes: mistakes, commandLength: command.length }]);
      setStatus(GameStatus.Success);
    }
  };

  const renderCommand = () => {
    return command.split('').map((char, index) => {
      let colorClass = 'text-cyan-600';
      if (index < typedCommand.length) {
        colorClass = typedCommand[index] === char ? 'text-cyan-300' : 'text-red-500';
      }
      return <span key={index} className={colorClass}>{char}</span>;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div 
        className="w-full max-w-3xl bg-black/50 border-2 border-fuchsia-500/50 box-glow-fuchsia p-4 md:p-8 font-fira-code"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center border-b-2 border-fuchsia-500/50 pb-2 mb-4">
          <h2 className="font-orbitron text-xl md:text-2xl text-fuchsia-400">HACKING TERMINAL</h2>
          {status === GameStatus.InProgress && (
            <div className="text-xl md:text-2xl text-red-500 font-bold">
              TIME: {timeLeft}s
            </div>
          )}
        </div>
        
        {status === GameStatus.Ready && (
            <div className="text-center py-10">
                <h3 className="text-2xl mb-4">Prepare for evaluation.</h3>
                <button onClick={startRound} className="font-orbitron text-xl px-10 py-3 border-2 border-cyan-500 text-cyan-500 bg-cyan-500/10 transition-all duration-300 hover:bg-cyan-500/30 box-glow-cyan">
                    START
                </button>
            </div>
        )}

        {(status === GameStatus.InProgress || status === GameStatus.Success || status === GameStatus.Failed) && (
            <div>
              <div className="text-gray-400 mb-2">// Round {currentRound + 1} of {TOTAL_ROUNDS} // Mistakes: {mistakes}</div>
              <div className="bg-gray-900 p-4 text-lg md:text-xl tracking-wider h-16 flex items-center">{renderCommand()}</div>
              <div className="flex items-center mt-4">
                  <span className="text-fuchsia-400 mr-2 text-lg md:text-xl">&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={typedCommand}
                    onChange={handleInputChange}
                    disabled={status !== GameStatus.InProgress}
                    className="bg-transparent border-none text-cyan-300 w-full focus:outline-none p-0 m-0 text-lg md:text-xl tracking-wider"
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <div className="w-2 h-6 bg-cyan-300 animate-pulse"></div>
              </div>
            </div>
        )}

        {status === GameStatus.Success && <GlitchText text="...ACCESS GRANTED..." className="text-green-400 text-2xl mt-4 text-center font-orbitron" />}
        {status === GameStatus.Failed && <GlitchText text="...CONNECTION SEVERED..." className="text-red-500 text-2xl mt-4 text-center font-orbitron" />}
        {status === GameStatus.Finished && <GlitchText text="...ANALYZING SIGNATURE..." className="text-yellow-400 text-2xl mt-4 text-center font-orbitron" />}

      </motion.div>
    </div>
  );
};

export default HackingTerminal;