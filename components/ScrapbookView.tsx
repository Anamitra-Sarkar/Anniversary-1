"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HeartDoodle, StarDoodle } from './Doodles';

// --- Subcomponents ---

function Timer() {
  const [time, setTime] = useState({ years: 0, days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const start = new Date('2022-05-10T00:00:00').getTime();
    
    const int = setInterval(() => {
        const now = new Date().getTime();
        const diff = now - start;
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTime({ years, days, hours, mins, secs });
    }, 1000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h3 className="font-cursive text-5xl text-[#3D2B1F]">Falling in Love</h3>
      <p className="text-[#3D2B1F]/60 uppercase tracking-[0.2em] text-xs font-handwritten">Since May 10, 2022</p>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full mt-8 text-center text-[#3D2B1F]">
        {[
            { label: 'Years', val: time.years},
            { label: 'Days', val: time.days},
            { label: 'Hours', val: time.hours},
            { label: 'Mins', val: time.mins},
            { label: 'Secs', val: time.secs},
        ].map((t, i) => (
            <div key={i} className="scrapbook-card p-3">
                <div className="font-handwritten text-4xl">{t.val}</div>
                <div className="text-sm font-handwritten">{t.label}</div>
            </div>
        ))}
      </div>
    </div>
  )
}

function Gallery() {
  return (
    <div className="flex flex-col items-center h-full pt-8">
       <h3 className="font-cursive text-4xl text-[#3D2B1F] mb-6">Captured Moments</h3>
       <div className="max-h-[320px] overflow-hidden">
         <div className="grid grid-cols-2 gap-4 w-full">
           {[11,12,13,14].map(n => (
              <div key={n} className="scrapbook-card p-2 aspect-square transform hover:-rotate-2 transition-transform duration-300">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={`/image${n}.jpg`} alt={`Gallery ${n}`} className="w-full h-full object-cover" />
              </div>
           ))}
         </div>
       </div>
    </div>
  )
}

function ScratchToReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if(!ctx || !canvasRef.current) return;
    
    document.fonts.ready.then(() => {
        ctx.fillStyle = '#D4B896'; // Warm gold/bronze
        ctx.fillRect(0,0,300,400);
        
        ctx.fillStyle = '#3D2B1F';
        ctx.font = '24px Caveat';
        ctx.textAlign = 'center';
        ctx.fillText('Scratch to Reveal', 150, 200);

        ctx.globalCompositeOperation = 'destination-out';
    });
  }, []);

  const handleScratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if(!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (300 / rect.width);
    const y = (e.clientY - rect.top) * (400 / rect.height);
    const ctx = canvasRef.current.getContext('2d')!;
    
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI*2);
    ctx.fill();
  }

  return (
    <div className="flex flex-col items-center justify-center h-full pt-8 space-y-6">
       <h3 className="font-cursive text-4xl text-[#3D2B1F]">A Hidden Memory</h3>
       <div className="relative w-full max-w-[200px] aspect-[3/4] scrapbook-card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/image10.jpg" alt="Secret Memory" className="absolute inset-0 w-full h-full object-cover" />
          <canvas 
             ref={canvasRef} 
             width={300} 
             height={400} 
             className="absolute inset-0 w-full h-full touch-none cursor-crosshair" 
             onPointerDown={() => setIsDragging(true)}
             onPointerUp={() => setIsDragging(false)}
             onPointerLeave={() => setIsDragging(false)}
             onPointerMove={handleScratch}
          />
       </div>
    </div>
  )
}

function Envelope({ opened }: { opened: boolean }) {
  const [open, setOpen] = useState(opened);
  useEffect(() => { setOpen(opened); }, [opened]); 

  return (
    <div className="flex flex-col items-center justify-center h-full pt-8">
       <div className="relative w-full max-w-[280px] aspect-[4/3] cursor-pointer overflow-visible mt-20" onClick={() => setOpen(true)}>
          <div className="absolute inset-0 bg-[#D4B896] scrapbook-card"></div>
          
          <motion.div 
             initial={false}
             animate={{ y: open ? -120 : 0, rotate: open ? -2 : 0 }} 
             transition={{ type: "spring", stiffness: 60, damping: 15 }}
             className="absolute inset-x-4 top-2 bottom-6 bg-[#FFFDF7] p-2 scrapbook-card z-20"
          >
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/image9.jpg" alt="Memory" className="w-full h-[85%] object-cover"/>
             <div className="w-full text-center mt-2 font-cursive text-2xl text-[#3D2B1F]">The first time</div>
          </motion.div>
          
          <div className="absolute inset-0 bg-[#E8A0A0] z-40" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% 50%, 0 0)'}}></div>
          
          <div className={`absolute top-0 left-0 w-full h-1/2 bg-[#C9A96E] origin-top transition-transform duration-700 z-30 scrapbook-card`} style={{ transform: open ? 'rotateX(180deg)' : 'rotateX(0deg)', opacity: open ? 0 : 1, transition: 'transform 0.7s, opacity 0.7s', clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden'}}></div>
       </div>
       <p className="mt-16 text-[#3D2B1F]/60 font-handwritten text-xl tracking-widest uppercase animate-pulse">{!open ? 'Tap to open' : 'A special moment'}</p>
    </div>
  )
}

// --- Main View ---

export default function ScrapbookView() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    { component: <Envelope opened={currentPage > 0} /> },
    { component: <ScratchToReveal /> },
    { component: <Gallery /> },
    { component: <Timer /> }
  ];

  return (
    <div className="w-full h-full relative paper-grain flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-4xl h-[500px] flex justify-center perspective-[2500px]">
         
         <div className="w-full md:w-[80%] h-full relative flex transform-style-3d">
            <div className="hidden md:block w-1/2 h-full z-0 bg-transparent"></div>
            
            <div className="w-full md:w-1/2 h-full relative mx-4 md:mx-0 perspective-[2000px]">
               
               <div className="absolute inset-0 bg-[#FFFDF7] scrapbook-card rounded-r-xl z-0"></div>

               {pages.map((page, idx) => {
                  const isTurned = currentPage > idx;
                  const zIndexPage = 40 - idx;
                  
                  return (
                     <div 
                        key={idx}
                        className="absolute inset-0 w-full h-full transform-style-3d origin-left transition-transform duration-[1.2s] ease-[cubic-bezier(0.645,0.045,0.355,1)]"
                        style={{ 
                           zIndex: isTurned ? 10 : zIndexPage, 
                           transform: isTurned ? 'rotateY(-180deg)' : 'rotateY(0deg)' 
                        }}
                     >
                        <div className="absolute inset-0 backface-hidden bg-[#FFFDF7] scrapbook-card rounded-r-xl p-8 flex flex-col overflow-hidden">
                           <div className="flex-grow">{page.component}</div>
                           
                           {/* Navigation */}
                           <div className="flex justify-between items-center mt-4">
                              <button 
                                 onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                 className={`text-[#3D2B1F]/60 hover:text-[#E8A0A0] transition-colors text-sm font-handwritten ${currentPage === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                              >
                                 &larr; Prev
                              </button>
                              <div className="text-[#3D2B1F]/30 text-xs font-mono">{currentPage + 1} / {pages.length}</div>
                              <button 
                                 onClick={() => setCurrentPage(p => Math.min(pages.length - 1, p + 1))}
                                 className={`text-[#3D2B1F]/60 hover:text-[#E8A0A0] transition-colors text-sm font-handwritten ${currentPage >= pages.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}
                              >
                                 Next &rarr;
                              </button>
                           </div>
                        </div>

                        <div 
                           className="absolute inset-0 backface-hidden bg-[#FFFDF7] scrapbook-card rounded-l-xl p-8 flex flex-col"
                           style={{ transform: 'rotateY(180deg)' }}
                        >
                           <div className="flex-grow flex items-center justify-center pointer-events-none text-[#3D2B1F]/20">
                              <span className="font-cursive text-6xl">♡</span>
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </div>
    </div>
  );
}
