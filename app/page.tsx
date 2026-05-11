"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import JourneyView from '@/components/JourneyView';
import StarsView from '@/components/StarsView';
import ScrapbookView from '@/components/ScrapbookView';
import AudioPlayer from '@/components/AudioPlayer';
import { WobblyUnderline, HeartDoodle } from '@/components/Doodles';

export default function Home() {
  const [activeView, setActiveView] = useState<'journey' | 'stars' | 'scrapbook'>('journey');

  const navItems = [
    { id: 'journey' as const, label: 'The Journey' },
    { id: 'stars' as const, label: 'Our Stars' },
    { id: 'scrapbook' as const, label: 'The Scrapbook' },
  ] as const;

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#FFF8F0] paper-grain">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex flex-col md:flex-row justify-between items-center bg-[#FFF8F0]/80 backdrop-blur-sm border-b border-[#D4B896]/30">
        <div className="flex items-center gap-2">
           <h1 className="font-cursive text-5xl text-[#3D2B1F] drop-shadow-sm cursor-default">Koyeliya</h1>
           <HeartDoodle className="rotate-12" />
        </div>
        
        <div className="flex gap-8 font-handwritten text-2xl text-[#3D2B1F]">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className="relative hover:text-[#E8A0A0] transition-colors"
            >
              {item.label}
              {activeView === item.id && (
                <motion.div layoutId="activeUnderline" className="absolute -bottom-3 left-0 w-full">
                  <WobblyUnderline />
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Global Audio Controller */}
      <AudioPlayer />

      {/* Main Views Container */}
      <div className="absolute inset-0 pt-32 w-full h-full">
         <AnimatePresence mode="wait">
            {activeView === 'journey' && (
               <motion.div
               key="journey"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8 }}
               className="absolute inset-0 z-0"
               >
               <JourneyView />
               </motion.div>
            )}
            {activeView === 'stars' && (
               <motion.div
               key="stars"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8 }}
               className="absolute inset-0 z-0"
               >
               <StarsView />
               </motion.div>
            )}
            {activeView === 'scrapbook' && (
               <motion.div
               key="scrapbook"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8 }}
               className="absolute inset-0 z-0"
               >
               <ScrapbookView />
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </main>
  );
}
