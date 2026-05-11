
export const HeartDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={`w-6 h-6 text-[#E8A0A0] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const StarDoodle = ({ className = "" }: { className?: string }) => (
  <svg className={`w-6 h-6 text-[#C9A96E] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export const WobblyUnderline = ({ className = "" }: { className?: string }) => (
  <svg className={`w-full h-4 ${className}`} viewBox="0 0 200 15" preserveAspectRatio="none" fill="none" stroke="#E8A0A0" strokeWidth="2" strokeLinecap="round">
    <path d="M5 10 Q 50 5, 100 10 T 195 10" />
  </svg>
);
