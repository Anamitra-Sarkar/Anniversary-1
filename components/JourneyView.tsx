"use client";

import { useRef, useEffect } from 'react';
import { StarDoodle } from './Doodles';

export default function JourneyView() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let animationFrame: number;
    let autoScrollSpeed = 0.5;

    const scroll = () => {
        if (container) {
            container.scrollLeft += autoScrollSpeed;
            // Loop: when reaching end, snap back
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            }
        }
        animationFrame = requestAnimationFrame(scroll);
    };
    
    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const memories = [
    { num: 1, text: "Our Beginning", desc: "Where it all started." },
    { num: 2, text: "Year One", desc: "The first year together." },
    { num: 3, text: "Year Two", desc: "Growing closer." },
    { num: 4, text: "Year Three", desc: "Adventures & Laughs." },
    { num: 5, text: "Year Four", desc: "Our 4th Anniversary." },
  ];

  return (
    <div className="relative w-full h-full flex flex-col pt-10">
      <div className="flex justify-center items-center gap-2 mb-10">
        <h2 className="font-sans text-5xl text-[#3D2B1F]">The Journey</h2>
        <StarDoodle className="-rotate-12" />
      </div>
      
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="flex items-center gap-12 px-20 py-12 overflow-x-auto scrollbar-hide select-none flex-grow"
      >
        {[...memories, ...memories].map((item, idx) => (
          <div 
            key={`${item.num}-${idx}`} 
            className="scrapbook-card w-72 p-4 pt-10 flex flex-col items-center flex-shrink-0"
            style={{ transform: `rotate(${(idx % 5 - 2) * 1.5}deg)` }}
          >
            {/* Washi Tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#E8A0A0]/40 -rotate-2 z-10"></div>
            
            <div className="w-full aspect-square bg-[#FFFDF7] overflow-hidden border border-[#D4B896]/20">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={`/image${item.num}.jpg`} alt={`Memory ${item.num}`} className="w-full h-full object-cover object-top" />
            </div>
            <h3 className="font-cursive text-[#3D2B1F] text-4xl mt-6">{item.text}</h3>
            <p className="font-handwritten text-[#3D2B1F]/70 text-xl text-center">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
<style jsx>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
