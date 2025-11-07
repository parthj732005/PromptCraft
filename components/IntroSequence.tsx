import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingText from './TypingText';

interface IntroSequenceProps {
  onComplete: () => void;
}

const LOG_MESSAGES = [
  'SCANNING RETINAL SIGNATURE...',
  'MATCH FOUND: CLASSIFIED',
  'ACCESS LEVEL: RESTRICTED',
];

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeouts: number[] = [];
    timeouts.push(window.setTimeout(() => setStep(1), 500));      // Show scanner
    timeouts.push(window.setTimeout(() => setStep(2), 2000));     // Start typing logs
    timeouts.push(window.setTimeout(() => setStep(3), 6500));     // Show final message
    timeouts.push(window.setTimeout(() => setStep(4), 8500));     // Trigger flash and fade
    timeouts.push(window.setTimeout(onComplete, 9000));          // Complete transition

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[#0b0c10] overflow-hidden">
      <AnimatePresence>
        {step >= 1 && step < 4 && (
          <motion.div
            key="scanner"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(10px)' }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full relative bg-cyan-500/10 box-glow-cyan p-2">
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(0, 255, 255, 0.7), transparent 40%, transparent)',
                  animation: 'scan-rotate 2s linear infinite',
                }}
              />
              <div className="absolute inset-2 rounded-full bg-[#0b0c10]"></div>
              <div className="absolute inset-4 rounded-full border-t-2 border-cyan-400 border-dashed animate-spin-slow"></div>
              <div className="absolute inset-8 rounded-full border-b-2 border-cyan-400 border-dashed animate-spin-slow reverse"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 font-fira-code text-cyan-300 text-lg md:text-xl h-28">
        <AnimatePresence>
          {step === 2 && (
            <motion.div
                key="logs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
              <TypingText text={LOG_MESSAGES[0]} speed={40} onComplete={() => {}} />
              <TypingText text={LOG_MESSAGES[1]} speed={40} delay={1500} onComplete={() => {}} />
              <TypingText text={LOG_MESSAGES[2]} speed={40} delay={3000} onComplete={() => {}} />
            </motion.div>
          )}
           {step === 3 && (
            <motion.div
                key="final-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0 }}
                className="font-orbitron text-2xl md:text-3xl text-fuchsia-400"
                style={{ animation: 'text-flicker 3s linear infinite' }}
            >
             HOLD STILL... CONNECTING YOUR NEURAL FEED…
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step === 4 && (
        <div className="absolute inset-0 bg-white z-50 pointer-events-none" style={{ animation: 'flash-bang 0.5s linear' }}></div>
      )}
    </div>
  );
};

export default IntroSequence;