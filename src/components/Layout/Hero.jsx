import React from 'react';
import { Wifi, Monitor, Globe } from 'lucide-react';
import InstructionText from '../Hacker/InstructionText';

const Hero = ({ 
  themeStyles, 
  settings, 
  isDark, 
  systemInfo, 
  isSettingsOpen 
}) => {
  
  // Helper to render the Hero Title based on Theme
  const renderHeroTitle = () => {
    if (settings.themeMode === 'hacker') {
      return (
        <h2 className={`mt-8 text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-4xl mx-auto glitch-hover ${themeStyles.textSecondary}`}>
          Knowledge is <span className="line-through decoration-red-500">Power</span> <br />
          <span className={themeStyles.textSecondary}>Control</span>
        </h2>
      );
    } else if (settings.themeMode === 'cute') {
      return (
        <h2 className={`mt-8 text-4xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto ${themeStyles.textSecondary}`}>
          Curiosity is <br />
          <span className={`${themeStyles.textPrimary} opacity-90 flex items-center justify-center gap-3`}>
             <span className="relative inline-block opacity-70">
               power
               {/* Custom Squiggle SVG Overlay */}
               <svg 
                 viewBox="0 0 100 20" 
                 className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-visible ${isDark ? 'text-teal-300' : 'text-teal-500'}`}
                 style={{ transform: 'translateY(10%) scale(1.05)' }}
               >
                 <path 
                   d="M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10" 
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="4"
                   strokeLinecap="round"
                 />
               </svg>
             </span>
             cute
          </span>
        </h2>
      );
    } else {
      return (
        <h2 className={`mt-8 text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto ${themeStyles.textSecondary}`}>
          Welcome to the Blog <br />
          <span className={`${themeStyles.textPrimary} opacity-80`}>Read & Learn</span>
        </h2>
      );
    }
  };

  return (
    <div className="mb-16 text-center space-y-4">
       {/* System Info Block */}
       <div className={`
         inline-flex flex-col items-center gap-2 px-6 py-3 border rounded text-xs uppercase opacity-80 transition-colors duration-500
         ${themeStyles.borderSecondary} ${themeStyles.borderDashed}
         ${isDark ? 'bg-white/5' : 'bg-black/5'}
       `}>
          <div className="flex items-center gap-3 w-full justify-center">
             <Wifi size={12} className={systemInfo.secure ? (isDark ? "text-green-500" : "text-green-600") : "animate-pulse text-red-500"} />
             <span>{systemInfo.secure ? 'Secure Link' : 'Open Link'}</span>
             <span className="opacity-30">|</span>
             <span className="font-bold">Node: {systemInfo.node}</span>
          </div>

          <div className="w-full h-px opacity-20 bg-current"></div>

          <div className="flex items-center gap-2 w-full justify-center">
             <Monitor size={12} />
             <span>Detected OS: {systemInfo.os}</span>
          </div>

          <div className="flex items-center gap-2 w-full justify-center">
             <Globe size={12} />
             <span>Client IP: {systemInfo.ip}</span>
          </div>
       </div>

       {/* Render Title */}
       {renderHeroTitle()}

       <p className="max-w-xl mx-auto text-sm md:text-base opacity-70 leading-relaxed transition-all duration-300">
         {settings.themeMode === 'hacker' ? (
           <>
             Accessing forbidden memory segments.{" "}
             <InstructionText globalDecrypted={settings.globalDecrypted} isSettingsOpen={isSettingsOpen} />
             {" "}Proceed with caution.
           </>
         ) : settings.themeMode === 'cute' ? (
           "Accessing forbidden cookie jars. Hover over snack blocks to sprinkle magic sugar. Proceed with cuddles."
         ) : (
           "Explore the latest updates and technical deep dives below."
         )}
       </p>
    </div>
  );
};

export default Hero;