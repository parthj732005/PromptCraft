import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Role, PerformanceStats } from '../types';

interface RoleRevealProps {
  role: Role;
  stats: PerformanceStats;
  onRestart: () => void;
}

const RoleReveal: React.FC<RoleRevealProps> = ({ role, stats, onRestart }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      <motion.div
        className="w-full text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-orbitron text-2xl text-fuchsia-400">Evaluation Complete</h2>
        <h1 className="font-orbitron text-4xl md:text-6xl text-glow-cyan">ROLE ASSIGNED</h1>
      </motion.div>
      
      <div 
        style={{ perspective: 2000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="w-[320px] h-[500px] md:w-[400px] md:h-[625px] bg-cyan-900/10 border-2 border-cyan-400 box-glow-cyan rounded-lg p-6 flex flex-col items-center text-center relative backdrop-blur-sm"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,255,255,0) 70%)'}}></div>

          <motion.div 
            className="w-24 h-24 md:w-32 md:h-32 text-fuchsia-400"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            <role.icon className="w-full h-full drop-shadow-[0_0_10px_#ff00ff]"/>
          </motion.div>
          
          <h3 className="font-orbitron text-3xl md:text-4xl mt-4 text-glow-fuchsia">{role.title}</h3>
          
          <p className="text-white/80 mt-4 text-sm md:text-base flex-grow">{role.description}</p>
          
          <div className="w-full mt-4 border-t-2 border-cyan-400/50 pt-4">
            <h4 className="font-orbitron text-lg text-cyan-300 mb-2">PERFORMANCE METRICS</h4>
            <div className="flex justify-around text-sm md:text-base">
               {stats.score !== undefined && stats.time !== undefined && stats.tags !== undefined ? (
                <>
                  <div>
                    <span className="text-gray-400">SCORE</span>
                    <p className="font-bold text-xl text-white">{stats.score}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">SURVIVAL</span>
                    <p className="font-bold text-xl text-white">{stats.time.toFixed(1)}s</p>
                  </div>
                  <div>
                    <span className="text-gray-400">TAGS</span>
                    <p className="font-bold text-xl text-white">{stats.tags}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-gray-400">ACCURACY</span>
                    <p className="font-bold text-xl text-white">{stats.accuracy}%</p>
                  </div>
                  <div>
                    <span className="text-gray-400">SPEED</span>
                    <p className="font-bold text-xl text-white">{stats.avgSpeed} C/s</p>
                  </div>
                  <div>
                    <span className="text-gray-400">MISTAKES</span>
                    <p className="font-bold text-xl text-white">{stats.mistakes}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={onRestart}
        className="font-orbitron text-lg mt-12 px-8 py-2 border-2 border-fuchsia-500 text-fuchsia-500 bg-fuchsia-500/10 transition-all duration-300"
        whileHover={{
            backgroundColor: 'rgba(212, 59, 226, 0.3)',
            boxShadow: "0 0 15px #d43be2",
            textShadow: "0 0 10px #d43be2",
            scale: 1.05
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        RE-EVALUATE
      </motion.button>
    </div>
  );
};

export default RoleReveal;