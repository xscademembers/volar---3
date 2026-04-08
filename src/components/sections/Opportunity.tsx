import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { AlertCircle, Activity, Crosshair } from 'lucide-react';

export const Opportunity = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Appears between 0.1 and 0.3
  const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [50, 0, 0, -50]);
  const display = useTransform(scrollYProgress, (p) => p < 0.05 || p > 0.35 ? "none" : "flex");

  return (
    <motion.section 
      className="absolute inset-0 flex items-center justify-center z-10 px-6 pointer-events-none"
      style={{ opacity, y, display }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-sm font-mono text-red-500 tracking-widest uppercase">Anomaly Detected</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            The hidden cost of <br />
            <span className="text-gray-500">reactive maintenance.</span>
          </h3>
          <p className="text-gray-400 text-lg mb-8">
            Inside confined spaces like boilers and silos, microscopic corrosion goes unnoticed until catastrophic failure. Traditional inspections are slow, dangerous, and incomplete.
          </p>
          
          <div className="space-y-4">
            {[
              { icon: Activity, text: "Unplanned downtime costs millions" },
              { icon: Crosshair, text: "Human inspection misses 30% of micro-fractures" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 glass-panel p-4 rounded-lg">
                <div className="p-2 bg-red-500/10 rounded-md">
                  <item.icon className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side is empty to let the canvas anomaly show through */}
        <div className="relative h-full min-h-[400px] flex items-center justify-center">
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 glass-panel p-6 rounded-xl border border-red-500/30 pointer-events-auto shadow-[0_0_30px_rgba(239,68,68,0.15)] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="text-xs font-mono text-red-400 tracking-wider">PREDICTION_MODEL_ACTIVE</div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between gap-12 text-sm mb-1">
                  <span className="text-gray-400">Structural Integrity</span>
                  <span className="text-red-400 font-mono">42.8%</span>
                </div>
                <div className="w-full bg-gray-900/80 h-1.5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className="bg-gradient-to-r from-red-600 to-red-400 h-full"
                    initial={{ width: "100%" }}
                    whileInView={{ width: "42.8%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-gray-500 font-mono mb-1">CORROSION DEPTH</div>
                  <div className="text-lg text-white font-mono">2.4mm</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-gray-500 font-mono mb-1">EST. FAILURE</div>
                  <div className="text-lg text-red-400 font-mono">14 DAYS</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
