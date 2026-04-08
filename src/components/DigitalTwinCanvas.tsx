import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'motion/react';

interface DigitalTwinCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export const DigitalTwinCanvas: React.FC<DigitalTwinCanvasProps> = ({ scrollYProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas resolution
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Node system
    const numNodes = 250;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; baseAlpha: number }[] = [];
    
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.1,
      });
    }

    // Drones (fast moving particles)
    const drones: { x: number; y: number; targetX: number; targetY: number; speed: number; progress: number }[] = [];
    for (let i = 0; i < 20; i++) {
      drones.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        speed: 0.002 + Math.random() * 0.005,
        progress: 0,
      });
    }

    let progress = 0;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      progress = v;
    });

    // Mouse interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background gradient based on progress
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#030303');
      bgGradient.addColorStop(1, progress > 0.8 ? '#0a192f' : '#050505'); // Teal tint at the end
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Scene Logic based on scroll progress
      // 0.0 - 0.15: Hero (Wide network)
      // 0.15 - 0.3: Opportunity (Zoom into anomaly)
      // 0.3 - 0.45: What You Get (Explode into grid)
      // 0.45 - 0.6: Why Volar Alta (Timeline ribbon)
      // 0.6 - 0.75: Trusted By (Logo rail - nodes form circle)
      // 0.75 - 0.9: Roundtable (Map/Graph)
      // 0.9 - 1.0: Final CTA (Massive teal grid)

      const isAnomaly = progress > 0.15 && progress < 0.3;
      const isGrid = progress >= 0.3 && progress < 0.45;
      const isRibbon = progress >= 0.45 && progress < 0.6;
      const isCircle = progress >= 0.6 && progress < 0.75;
      const isMap = progress >= 0.75 && progress < 0.9;
      const isFinal = progress >= 0.9;

      // Update and draw nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Movement logic
        if (isGrid) {
          // Snap to grid
          const cols = 15;
          const spacingX = width / cols;
          const spacingY = height / 10;
          const targetX = (i % cols) * spacingX + spacingX / 2;
          const targetY = Math.floor(i / cols) * spacingY + spacingY / 2;
          node.x += (targetX - node.x) * 0.05;
          node.y += (targetY - node.y) * 0.05;
        } else if (isRibbon) {
          // Snap to horizontal line
          const targetX = (i / nodes.length) * width;
          const targetY = height / 2 + Math.sin(i * 0.1 + performance.now() * 0.001) * 50;
          node.x += (targetX - node.x) * 0.05;
          node.y += (targetY - node.y) * 0.05;
        } else if (isCircle) {
          // Form a large circle behind the quote
          const angle = (i / nodes.length) * Math.PI * 2;
          const radius = Math.min(width, height) * 0.35 + Math.sin(i * 0.5 + performance.now() * 0.002) * 20;
          const targetX = width / 2 + Math.cos(angle) * radius;
          const targetY = height / 2 + Math.sin(angle) * radius;
          node.x += (targetX - node.x) * 0.05;
          node.y += (targetY - node.y) * 0.05;
        } else if (isMap) {
          // Form 3 clusters (Mumbai, Gujarat, Odisha)
          const clusterIndex = i % 3;
          const centers = [
            { x: width * 0.3, y: height * 0.6 },
            { x: width * 0.5, y: height * 0.4 },
            { x: width * 0.7, y: height * 0.5 }
          ];
          const center = centers[clusterIndex];
          const angle = (i / nodes.length) * Math.PI * 2 * 3;
          const radius = 50 + Math.random() * 50;
          const targetX = center.x + Math.cos(angle) * radius;
          const targetY = center.y + Math.sin(angle) * radius;
          node.x += (targetX - node.x) * 0.05;
          node.y += (targetY - node.y) * 0.05;
        } else if (isFinal) {
           // Massive teal grid expanding
           const cols = 20;
           const spacingX = width / cols;
           const spacingY = height / 15;
           const targetX = (i % cols) * spacingX + spacingX / 2;
           const targetY = Math.floor(i / cols) * spacingY + spacingY / 2;
           node.x += (targetX - node.x) * 0.1;
           node.y += (targetY - node.y) * 0.1;
        } else {
          // Free floating
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        // Mouse repulsion
        const dxMouse = node.x - mouseX;
        const dyMouse = node.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 100) {
          const force = (100 - distMouse) / 100;
          node.x += (dxMouse / distMouse) * force * 2;
          node.y += (dyMouse / distMouse) * force * 2;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (isFinal ? 2 : 1), 0, Math.PI * 2);
        
        let nodeColor = `rgba(138, 141, 145, ${node.baseAlpha})`; // Steel
        if (isAnomaly && i < 20) {
          // Anomaly cluster
          nodeColor = `rgba(239, 68, 68, ${Math.sin(performance.now() * 0.005) * 0.5 + 0.5})`; // Alert red pulsing
        } else if (isFinal) {
          nodeColor = `rgba(45, 212, 191, ${node.baseAlpha + 0.3})`; // Teal
        } else if (isMap) {
          nodeColor = `rgba(45, 212, 191, ${node.baseAlpha + 0.1})`; // Teal for map nodes
        }
        
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let maxDist = 100;
          if (isGrid || isFinal) maxDist = 150;
          if (isRibbon) maxDist = 80;
          if (isCircle) maxDist = 100;
          if (isMap) maxDist = 120;

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            
            let alpha = (1 - dist / maxDist) * 0.2;
            let strokeColor = `rgba(138, 141, 145, ${alpha})`;
            
            if (isAnomaly && i < 20 && j < 20) {
              strokeColor = `rgba(239, 68, 68, ${alpha * 2})`;
            } else if (isFinal) {
              strokeColor = `rgba(45, 212, 191, ${alpha * 2})`;
            } else if (isMap && i % 3 === j % 3) {
              // Stronger connections within the same cluster
              strokeColor = `rgba(45, 212, 191, ${alpha * 1.5})`;
            }

            ctx.strokeStyle = strokeColor;
            ctx.stroke();
          }
        }
      }

      // Draw drones
      if (!isGrid && !isRibbon) {
        const activeDrones = isFinal ? drones : drones.slice(0, 5);
        for (const drone of activeDrones) {
          drone.progress += drone.speed * (isFinal ? 2 : 1); // Faster in final
          if (drone.progress >= 1) {
            drone.x = drone.targetX;
            drone.y = drone.targetY;
            drone.targetX = Math.random() * width;
            drone.targetY = Math.random() * height;
            drone.progress = 0;
          }

          const currentX = drone.x + (drone.targetX - drone.x) * drone.progress;
          const currentY = drone.y + (drone.targetY - drone.y) * drone.progress;

          ctx.beginPath();
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
          ctx.fillStyle = isFinal ? '#2dd4bf' : '#ffffff';
          ctx.fill();

          // Drone trail
          const trailLength = 0.15; // 15% of the path length
          const trailStartX = drone.x + (drone.targetX - drone.x) * Math.max(0, drone.progress - trailLength);
          const trailStartY = drone.y + (drone.targetY - drone.y) * Math.max(0, drone.progress - trailLength);

          ctx.beginPath();
          ctx.moveTo(trailStartX, trailStartY);
          ctx.lineTo(currentX, currentY);
          ctx.strokeStyle = isFinal ? 'rgba(45, 212, 191, 0.4)' : 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = isFinal ? 2 : 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};
