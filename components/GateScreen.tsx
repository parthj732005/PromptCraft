import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

interface GateScreenProps {
  onBreach: () => void;
}

const GateScreen: React.FC<GateScreenProps> = ({ onBreach }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <GlitchText text="NeoCity Recruitment" className="font-orbitron text-4xl md:text-6xl lg:text-8xl font-black uppercase text-glow-cyan" />
        <h2 className="font-orbitron text-xl md:text-3xl text-fuchsia-400 mt-2 tracking-[0.2em]">
          GHOSTWAVE PROTOCOL
        </h2>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-16 border-2 border-cyan-400/50 p-6 md:p-10 relative box-glow-cyan"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b0c10] px-4 text-cyan-400">
          SECURE GATE
        </div>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0b0c10] px-4 text-cyan-400">
          AUTHORIZATION REQUIRED
        </div>
        
        <p className="max-w-md text-sm md:text-base text-white/80">
          Connection established. Ghostwave network detected. Mainframe security is active. Override required to proceed.
        </p>

        <motion.button
          onClick={onBreach}
          className="font-orbitron text-2xl mt-8 px-12 py-3 border-2 border-fuchsia-500 text-fuchsia-500 bg-fuchsia-500/10 relative overflow-hidden transition-all duration-300"
          whileHover={{
            backgroundColor: 'rgba(212, 59, 226, 0.3)',
            boxShadow: "0 0 15px #d43be2, 0 0 30px #d43be2",
            textShadow: "0 0 10px #d43be2",
            scale: 1.05
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">BREACH</span>
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-fuchsia-500"
            initial={{ y: '100%' }}
            whileHover={{ y: ['100%', '-100%'] }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ zIndex: 5 }}
           />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GateScreen;
