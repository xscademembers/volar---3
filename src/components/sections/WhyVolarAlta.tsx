import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

export const WhyVolarAlta = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Appears between 0.45 and 0.6
  const opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], [50, 0, 0, -50]);
  const display = useTransform(scrollYProgress, (p) => p < 0.4 || p > 0.65 ? "none" : "flex");

  const milestones = [
    { value: "6+", label: "Years Field-First" },
    { value: "500k", label: "Hours of Data" },
    { value: "50+", label: "Facilities Mapped" },
    { value: "100%", label: "Safety Record" }
  ];

  return (
    <motion.section 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none"
      style={{ opacity, y, display }}
    >
      <div className="max-w-5xl mx-auto w-full pointer-events-auto text-center">
        <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-12">Institutional Credibility</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {milestones.map((m, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            >
              <div className="text-4xl md:text-6xl font-bold font-mono text-white mb-2 tracking-tighter">
                {m.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 flex justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute inset-0 bg-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf]" />
            <span className="text-sm font-medium relative z-10">IndiaAI Backed</span>
          </div>
          <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
            <span className="text-sm font-medium relative z-10">Station F Paris</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
