import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { Layers, Cpu, Shield } from 'lucide-react';

export const WhatYouGet = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Appears between 0.3 and 0.45
  const opacity = useTransform(scrollYProgress, [0.3, 0.35, 0.4, 0.45], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.3, 0.35, 0.4, 0.45], [50, 0, 0, -50]);
  const display = useTransform(scrollYProgress, (p) => p < 0.25 || p > 0.5 ? "none" : "flex");

  const cards = [
    {
      icon: Cpu,
      title: "Autonomous Capture",
      desc: "Drones and crawlers navigate confined spaces without human entry, capturing millimeter-accurate visual and thermal data."
    },
    {
      icon: Layers,
      title: "Digital Twin Generation",
      desc: "Raw data is instantly processed into a navigable 3D model, mapping every asset with spatial awareness."
    },
    {
      icon: Shield,
      title: "Predictive Intelligence",
      desc: "Our neural networks identify micro-fractures and corrosion, predicting failure before it happens."
    }
  ];

  return (
    <motion.section 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none"
      style={{ opacity, y, display }}
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-teal-400 tracking-widest uppercase mb-4">The Solution</h2>
          <h3 className="text-4xl md:text-5xl font-bold">
            Data becomes <span className="text-gradient-teal">Software.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div 
              key={i} 
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-teal-500/30 transition-colors duration-500 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <card.icon className="w-8 h-8 text-teal-400 mb-6" />
              <h4 className="text-xl font-semibold mb-3">{card.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow">{card.desc}</p>
              
              {/* Abstract data visualization */}
              <div className="mt-8 h-12 flex items-end gap-1 opacity-20 group-hover:opacity-50 transition-opacity duration-500">
                {[...Array(12)].map((_, j) => (
                  <motion.div 
                    key={j}
                    className="w-full bg-teal-400 rounded-t-sm"
                    initial={{ height: "10%" }}
                    animate={{ height: `${Math.random() * 80 + 20}%` }}
                    transition={{ 
                      duration: 1.5 + Math.random(), 
                      repeat: Infinity, 
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
