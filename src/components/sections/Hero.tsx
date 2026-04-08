import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

export const Hero = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const display = useTransform(scrollYProgress, (p) => p > 0.15 ? "none" : "flex");

  return (
    <motion.section 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
      style={{ opacity, y, scale, display }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-mono text-gray-300 tracking-wider">SYSTEM ONLINE</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Industrial Intelligence, <br />
          <span className="text-gradient-teal">Evolved.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light"
        >
          Transforming physical assets into living digital twins. 
          Predictive maintenance powered by autonomous robotics and deep neural networks.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-300 relative overflow-hidden group">
            <span className="relative z-10">Initialize Scan</span>
            <div className="absolute inset-0 bg-teal-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-[scan_2s_linear_infinite]" />
            </div>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};
