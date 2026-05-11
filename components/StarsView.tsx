"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function StarsView({ hidden }: { hidden?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeModal, setActiveModal] = useState<{id: number, name: string, img: string, desc: string, objectPosition: string} | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current || hidden) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    let reqId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let camX = 0; 
    let camY = 0;
    let isDragging = false;
    let lastMouse = { x: 0, y: 0 };
    let currentMouse = { x: 0, y: 0 };
    let hoveredId: number | null = null;
    
    // Background stars
    const bgStars = Array.from({length: 400}, () => ({
        x: (Math.random() - 0.5) * width * 4,
        y: (Math.random() - 0.5) * height * 4,
        r: Math.random() * 1.5,
        alpha: Math.random()
    }));

    // Extra static background stars
    const faintStars = Array.from({length: 20}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 0.5 + 0.5,
    }));

    // Constellations (Years 1-4)
    const constellations = [
        { id: 1, name: "The Spark", img: "/image5.jpg", objectPosition: "top center", desc: "When everything started feeling different.", x: -width/4, y: -height/4, vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2, points: [{x: 0, y:0}, {x:50, y:-40}, {x:90, y:10}, {x:140, y:-20}] },
        { id: 2, name: "Falling Deeper", img: "/image6.jpg", objectPosition: "center 20%", desc: "The more I knew you, the more I was gone.", x: width/3, y: -height/6, vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2, points: [{x: 0, y:0}, {x:-30, y:60}, {x:40, y:100}, {x:80, y:50}] },
        { id: 3, name: "Our Adventures", img: "/image7.jpg", objectPosition: "top center", desc: "Every moment I'd relive a thousand times.", x: -width/5, y: height/3, vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2, points: [{x: 0, y:0}, {x:60, y:20}, {x:80, y:-30}, {x:130, y:40}] },
        { id: 4, name: "Forever Yours", img: "/image8.jpg", objectPosition: "top center", desc: "Still us. Still magic. Always.", x: width/4, y: height/4, vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2, points: [{x: 0, y:0}, {x:-40, y:-40}, {x:-80, y:10}, {x:-100, y:-50}] },
    ];

    const getScreenPos = (cx: number, cy: number, px: number, py: number) => {
       return { x: cx + px + width/2 + camX, y: cy + py + height/2 + camY };
    }

    const draw = () => {
      // Background gradient
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      gradient.addColorStop(0, '#1e0f2e');
      gradient.addColorStop(1, '#1a1035');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Faint background stars
      faintStars.forEach(s => {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 248, 214, 0.2)';
          ctx.fill();
      });

      // Draw Bg Stars
      bgStars.forEach(s => {
         const sx = s.x + width/2 + camX * 0.2; // Parallax background
         const sy = s.y + height/2 + camY * 0.2;
         
         if (sx < 0 || sx > width || sy < 0 || sy > height) return;
         ctx.beginPath();
         ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
         ctx.fillStyle = `rgba(255, 248, 214, ${s.alpha * 0.4})`;
         ctx.fill();
         s.alpha += (Math.random() - 0.5) * 0.05;
         if(s.alpha < 0.2) s.alpha = 0.2; if(s.alpha > 0.6) s.alpha = 0.6;
      });

      // Draw Constellations
      let foundHover = null;

      constellations.forEach(c => {
         // Apply roaming
         c.x += c.vx;
         c.y += c.vy;

         // Bounce off edges
         if (Math.abs(c.x) > width) c.vx *= -1;
         if (Math.abs(c.y) > height) c.vy *= -1;

         const isHovered = hoveredId === c.id;
         
         // Connect points
         ctx.beginPath();
         c.points.forEach((p, i) => {
            const pos = getScreenPos(c.x, c.y, p.x, p.y);
            if (i === 0) ctx.moveTo(pos.x, pos.y);
            else ctx.lineTo(pos.x, pos.y);
         });
         ctx.setLineDash([5, 5]);
         ctx.strokeStyle = isHovered ? 'rgba(232, 160, 160, 0.8)' : 'rgba(201, 169, 110, 0.3)';
         ctx.lineWidth = isHovered ? 2 : 1;
         ctx.stroke();
         ctx.setLineDash([]); // Reset line dash

         // Draw nodes and check hover
         c.points.forEach((p) => {
            const pos = getScreenPos(c.x, c.y, p.x, p.y);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, isHovered ? 8 : 4, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? '#E8A0A0' : '#FFF8D6';
            ctx.fill();
            if (isHovered) {
              ctx.shadowColor = '#FFF8D6';
              ctx.shadowBlur = 10;
              ctx.fill();
              ctx.shadowBlur = 0;
            }

            // Hover check
            const dx = currentMouse.x - pos.x;
            const dy = currentMouse.y - pos.y;
            if (Math.sqrt(dx*dx + dy*dy) < 30) {
               foundHover = c.id;
            }
         });
      });

      hoveredId = foundHover;
      canvas.style.cursor = hoveredId ? 'pointer' : (isDragging ? 'grabbing' : 'grab');

      reqId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
       width = window.innerWidth;
       height = window.innerHeight;
       canvas.width = width;
       canvas.height = height;
    };

    const onPointerDown = (e: PointerEvent) => {
       isDragging = true;
       lastMouse = { x: e.clientX, y: e.clientY };
    }

    const onPointerMove = (e: PointerEvent) => {
       const rect = canvas.getBoundingClientRect();
       currentMouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
       
       if (isDragging) {
         camX += e.clientX - lastMouse.x;
         camY += e.clientY - lastMouse.y;
         lastMouse = { x: e.clientX, y: e.clientY };
       }
    }

    const onPointerUp = () => {
       isDragging = false;
    }

    const onClick = () => {
       if (hoveredId) {
          const c = constellations.find(x => x.id === hoveredId);
          if (c) setActiveModal({ id: c.id, name: c.name, img: c.img || '', desc: c.desc, objectPosition: c.objectPosition || 'top center' });
       }
    }

    window.addEventListener('resize', onResize);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('click', onClick);

    return () => {
       cancelAnimationFrame(reqId);
       window.removeEventListener('resize', onResize);
       canvas.removeEventListener('pointerdown', onPointerDown);
       canvas.removeEventListener('pointermove', onPointerMove);
       canvas.removeEventListener('pointerup', onPointerUp);
       canvas.removeEventListener('click', onClick);
    }

  }, [hidden]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 touch-none block" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#FFF8D6]/50 font-handwritten text-xl pointer-events-none z-10 text-center">
        our little universe ✨
      </div>

      <AnimatePresence>
         {activeModal && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
               onClick={() => setActiveModal(null)}
            >
               <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className="relative max-w-sm w-full bg-[#FFFDF7] p-4 pt-10 scrapbook-card flex flex-col items-center"
               >
                  <button 
                     onClick={() => setActiveModal(null)}
                     className="absolute top-2 right-2 text-[#3D2B1F]/50 hover:text-[#3D2B1F]"
                  >
                     <X size={20} />
                  </button>
                  <div className="w-full aspect-square bg-[#FFFDF7] overflow-hidden border border-[#D4B896]/20 mb-6">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={activeModal.img} alt={activeModal.name} className="w-full h-full object-cover" style={{ objectPosition: activeModal.objectPosition }} />
                  </div>
                  <h3 className="font-cursive text-[#3D2B1F] text-4xl mb-2 text-center">{activeModal.name}</h3>
                  <p className="text-[#3D2B1F]/70 font-handwritten text-xl text-center">{activeModal.desc}</p>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );
}
