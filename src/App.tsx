import React, { useRef, useState, useEffect } from 'react';
import { useScroll, motion, useMotionValueEvent } from 'motion/react';
import { SmoothScroll } from './components/SmoothScroll';
import { DigitalTwinCanvas } from './components/DigitalTwinCanvas';
import { Hero } from './components/sections/Hero';
import { Opportunity } from './components/sections/Opportunity';
import { WhatYouGet } from './components/sections/WhatYouGet';
import { WhyVolarAlta } from './components/sections/WhyVolarAlta';
import { TrustedBy } from './components/sections/TrustedBy';
import { Roundtable } from './components/sections/Roundtable';
import { FinalCTA } from './components/sections/FinalCTA';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.15) setCurrentSection(1);
    else if (latest < 0.3) setCurrentSection(2);
    else if (latest < 0.45) setCurrentSection(3);
    else if (latest < 0.6) setCurrentSection(4);
    else if (latest < 0.75) setCurrentSection(5);
    else if (latest < 0.9) setCurrentSection(6);
    else setCurrentSection(7);
  });

  return (
    <SmoothScroll>
      <div className="relative bg-black text-white selection:bg-teal-500/30">
        <DigitalTwinCanvas scrollYProgress={scrollYProgress} />
        
        {/* Fixed Section Counter */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 mix-blend-difference hidden md:flex flex-col items-center gap-4">
          <div className="w-[1px] h-12 bg-white/20" />
          <div className="font-mono text-sm tracking-widest text-white/50 flex flex-col items-center gap-1">
            <span className="text-white">0{currentSection}</span>
            <span className="text-[10px]">/</span>
            <span className="text-[10px]">07</span>
          </div>
          <div className="w-[1px] h-12 bg-white/20" />
        </div>

        {/* The container that dictates the total scroll height */}
        <div ref={containerRef} className="relative h-[700vh]">
          {/* Fixed overlay container for the sections */}
          <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
            <motion.div 
              className="absolute inset-0 w-full h-full"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Hero scrollYProgress={scrollYProgress} />
              <Opportunity scrollYProgress={scrollYProgress} />
              <WhatYouGet scrollYProgress={scrollYProgress} />
              <WhyVolarAlta scrollYProgress={scrollYProgress} />
              <TrustedBy scrollYProgress={scrollYProgress} />
              <Roundtable scrollYProgress={scrollYProgress} />
              <FinalCTA scrollYProgress={scrollYProgress} />
            </motion.div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
