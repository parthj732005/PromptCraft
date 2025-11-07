import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NeonCrystalCity from './ui/NeonCrystalCity';
import NeonRunnerGame from './NeonRunnerGame';
import { Role, PerformanceStats } from '../types';
import { getRoleForScore } from '../constants';

interface GameScreenProps {
  onComplete: (role: Role, stats: PerformanceStats) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onComplete }) => {
    const [gameStarted, setGameStarted] = useState(false);

    const handleGameComplete = (score: number, time: number) => {
        const role = getRoleForScore(score, time);
        const tags = score / 10;
        const stats: PerformanceStats = {
            score,
            time,
            tags,
            // for compatibility
            accuracy: 0,
            avgSpeed: 0,
            mistakes: 0,
        };
        onComplete(role, stats);
    };

    return (
        <div className="relative w-screen h-screen bg-black">
            <div className="absolute inset-0">
                <NeonCrystalCity cameraSpeed={5} />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {!gameStarted ? (
                    <motion.div 
                        className="text-center text-white p-8 bg-black/50 rounded-lg backdrop-blur-sm border border-fuchsia-500/30 box-glow-fuchsia"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="font-orbitron text-4xl text-glow-cyan">NEON RUNNER</h1>
                        <p className="text-lg mt-4 text-white/80 max-w-md">
                            Switch lanes to collect data tags and dodge corrupted firewalls.
                            Your performance will determine your role in Ghostwave.
                        </p>
                        <motion.button
                            onClick={() => setGameStarted(true)}
                            className="font-orbitron text-xl mt-8 px-10 py-3 border-2 border-fuchsia-500 text-fuchsia-500 bg-fuchsia-500/10 transition-all duration-300"
                             whileHover={{
                                backgroundColor: 'rgba(212, 59, 226, 0.3)',
                                boxShadow: "0 0 15px #d43be2",
                                textShadow: "0 0 10px #d43be2",
                                scale: 1.05
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            INITIATE RUN
                        </motion.button>
                    </motion.div>
                ) : (
                    <NeonRunnerGame onComplete={handleGameComplete} />
                )}
            </div>
        </div>
    );
};

export default GameScreen;
