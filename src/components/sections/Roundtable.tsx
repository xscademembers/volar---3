import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { Globe, FileText } from 'lucide-react';

export const Roundtable = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Appears between 0.75 and 0.9
  const opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.85, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.75, 0.8, 0.85, 0.9], [50, 0, 0, -50]);
  const display = useTransform(scrollYProgress, (p) => p < 0.7 || p > 0.95 ? "none" : "flex");

  return (
    <motion.section 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none"
      style={{ opacity, y, display }}
    >
      <div className="max-w-5xl mx-auto w-full pointer-events-auto text-center">
        <div className="inline-flex items-center justify-center p-4 bg-teal-500/10 rounded-full mb-8">
          <Globe className="w-8 h-8 text-teal-400" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ecosystem Intelligence
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-16">
          Beyond individual assets, we are building the policy and data infrastructure for the future of industrial safety across global nodes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Mumbai Anchor', 'Gujarat Node', 'Odisha Expansion'].map((node, i) => (
            <motion.div 
              key={i} 
              className="glass-panel p-6 rounded-xl flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
            >
              <div className="w-3 h-3 rounded-full bg-teal-400 mb-4 animate-pulse shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
              <h4 className="font-medium text-white mb-2">{node}</h4>
              <div className="text-xs text-gray-500 font-mono">ACTIVE_SYNC</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 relative flex justify-center">
          <motion.div 
            className="absolute top-0 w-64 h-20 bg-white/5 border border-white/10 rounded-xl -translate-y-4 scale-90 blur-[1px]"
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: -16 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.div 
            className="absolute top-0 w-72 h-20 bg-white/10 border border-white/10 rounded-xl -translate-y-2 scale-95"
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: -8 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.div 
            className="relative z-10 inline-flex items-center gap-3 glass-panel px-8 py-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <FileText className="w-5 h-5 text-teal-400" />
            <span className="text-sm font-medium">Download Industry Report 2026</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
