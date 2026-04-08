import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

export const TrustedBy = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Appears between 0.6 and 0.75
  const opacity = useTransform(scrollYProgress, [0.6, 0.65, 0.7, 0.75], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.6, 0.65, 0.7, 0.75], [50, 0, 0, -50]);
  const display = useTransform(scrollYProgress, (p) => p < 0.55 || p > 0.8 ? "none" : "flex");

  const logos = ["TATA", "RELIANCE", "ADANI", "L&T", "VEDANTA", "JSW"];

  return (
    <motion.section 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none"
      style={{ opacity, y, display }}
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        <h2 className="text-center text-sm font-mono text-gray-400 tracking-widest uppercase mb-16">Trusted by Industry Leaders</h2>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50">
          {logos.map((logo, i) => (
            <motion.div 
              key={i} 
              className="relative text-2xl md:text-4xl font-bold tracking-tighter text-gray-600 hover:text-white transition-colors duration-300 cursor-default group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            >
              {logo}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-24 max-w-2xl mx-auto glass-panel p-8 rounded-2xl relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <div className="absolute -top-4 -left-4 text-6xl text-teal-500/20 font-serif">"</div>
          <p className="text-lg md:text-xl text-gray-300 italic mb-6 relative z-10">
            Volar Alta's digital twin approach transformed our maintenance schedule from reactive firefighting to predictable, managed operations. The ROI was realized in the first quarter.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-800" />
            <div>
              <div className="font-medium text-white">Chief Operations Officer</div>
              <div className="text-sm text-gray-500">Global Steel Manufacturer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
