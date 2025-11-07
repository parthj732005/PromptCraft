import React from 'react';
import { motion } from 'framer-motion';
import { LORE_TEXT } from '../constants';
import GlitchText from './GlitchText';

interface MainInterfaceProps {
  onStartHacking: () => void;
}

const MainInterface: React.FC<MainInterfaceProps> = ({ onStartHacking }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <GlitchText text="GHOSTWAVE MANIFESTO" className="font-orbitron text-3xl md:text-5xl text-glow-cyan text-center" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 border border-cyan-400/30 p-4 md:p-6 relative bg-cyan-400/5 box-glow-cyan"
        >
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
            
            <h3 className="font-orbitron text-lg text-fuchsia-400 mb-2">// DATA SHARD 734:</h3>
            <p className="text-white/80 leading-relaxed text-sm md:text-base">{LORE_TEXT}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
            <p className="text-lg text-white mb-4">Think you have what it takes? The terminal awaits.</p>
            <motion.button
              onClick={onStartHacking}
              className="font-orbitron text-xl px-10 py-3 border-2 border-fuchsia-500 text-fuchsia-500 bg-fuchsia-500/10 transition-all duration-300"
              whileHover={{
                backgroundColor: 'rgba(212, 59, 226, 0.3)',
                boxShadow: "0 0 15px #d43be2, 0 0 30px #d43be2",
                textShadow: "0 0 10px #d43be2",
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              JACK IN
            </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default MainInterface;
