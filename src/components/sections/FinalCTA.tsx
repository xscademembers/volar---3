import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const FinalCTA = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Appears from 0.9 onwards
  const opacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.85, 0.95], [0.9, 1]);
  const display = useTransform(scrollYProgress, (p) => p < 0.8 ? "none" : "flex");

  return (
    <motion.section 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none"
      style={{ opacity, scale, display }}
    >
      <div className="max-w-4xl mx-auto w-full pointer-events-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Unlock the <br />
          <span className="text-teal-400">Intelligence Layer.</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Deploy the Volar Alta digital twin ecosystem across your facilities today.
        </p>

        <button className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-white bg-teal-500 rounded-full overflow-hidden transition-transform hover:scale-105">
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <span className="relative flex items-center gap-2">
            Request Deployment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        <div className="mt-16 flex justify-center gap-8 text-sm text-gray-500 font-mono">
          <span>SYS.STATUS: ONLINE</span>
          <span>NODES: 150+</span>
          <span>LATENCY: 12ms</span>
        </div>
      </div>
    </motion.section>
  );
};
