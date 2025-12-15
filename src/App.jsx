import React, { useState, useEffect } from 'react';
import { Hash, Wifi, Sun, Moon, Settings, Globe, Monitor, Heart, FileText } from 'lucide-react';
import BlogCard from './components/BlogCard';
import BlogPost from './components/BlogPost';
import SettingsModal from './components/Settings/SettingsModal';
import MobileWarning from './components/MobileWarning';
import InstructionText from './components/InstructionText';
import BackgroundEffects from './components/BackgroundEffects';
import { BLOG_POSTS } from './data';
// Custom Hooks
import { useSettings } from './hooks/useSettings';
import { useSystemDiagnostics } from './hooks/useSystemDiagnostics';
import { useFontLoader } from './hooks/useFontLoader';
// CSS
import './index.css';
import './hacker-effects.css';
import './cute-effects.css';

const App = () => {
  const [activePost, setActivePost] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Initialize Hooks
  const { settings, updateSetting, resetSettings, themeStyles, activeFontFamily } = useSettings(isDark);
  const { systemInfo, showMobileWarning, closeMobileWarning } = useSystemDiagnostics();
  useFontLoader(settings);

  // Mouse Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Favicon Switcher Logic
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    
    const basePath = import.meta.env.BASE_URL; 
    
    link.href = settings.themeMode === 'cute' 
      ? `${basePath}favicon-cute.svg` 
      : `${basePath}favicon.svg`;

    document.getElementsByTagName('head')[0].appendChild(link);
  }, [settings.themeMode]);

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
                 // Updated to Turquoise/Teal for high contrast
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
    <>
      <div 
        className={`
          min-h-screen relative overflow-x-hidden transition-colors duration-700 ease-in-out
          ${themeStyles.appBg} 
          ${themeStyles.textPrimary}
          theme-${settings.themeMode}
          ${settings.themeMode === 'hacker' ? 'scanline font-mono selection:bg-red-500 selection:text-white' : ''}
          ${settings.themeMode === 'cute' ? 'font-sans selection:bg-pink-300 selection:text-white' : ''}
          ${settings.themeMode === 'normal' ? 'font-sans selection:bg-blue-300 selection:text-white' : ''}
        `}
        style={{ 
          '--flicker-duration': `${settings.flickerDuration}s`,
          fontFamily: activeFontFamily 
        }}
      >
        
        {showMobileWarning && (
          <MobileWarning 
            onClose={closeMobileWarning} 
            isDark={isDark} 
          />
        )}

        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          isDark={isDark}
          settings={settings}
          updateSetting={updateSetting}
          resetSettings={resetSettings}
        />

        {/* Updated Background Component */}
        <BackgroundEffects themeMode={settings.themeMode} isDark={isDark} settings={settings} />

        <header className={`
          fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between
          backdrop-blur-md border-b transition-colors duration-500
          ${themeStyles.headerBg} ${themeStyles.borderSecondary}
        `}>
          <div className="flex items-center gap-2 group cursor-default">
            <div className={`p-2 border transition-colors duration-300 ${themeStyles.borderPrimary} ${isDark ? 'bg-white/5' : 'bg-black/5'} ${themeStyles.roundedBtn}`}>
               {settings.themeMode === 'hacker' && <Hash size={20} className="animate-spin-slow" />}
               {settings.themeMode === 'cute' && <Heart size={20} className="animate-bounce" />}
               {settings.themeMode === 'normal' && <FileText size={20} />}
            </div>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-widest leading-none">
                {settings.themeMode === 'cute' ? (
                  <>Kawaii_<span className="animate-pulse inline-block">Terminal</span></>
                ) : (
                  <>Zero_Day_<span className="animate-pulse inline-block">Log</span></>
                )}
              </h1>
              <span className={`text-[10px] uppercase opacity-60`}>
                {settings.themeMode === 'hacker' && 'Encrypted Archive V.3.2.0'}
                {settings.themeMode === 'cute' && 'Cuddle Protocol V.3.2.0'}
                {settings.themeMode === 'normal' && 'Personal Blog V.3.2.0'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`
                flex items-center gap-2 text-xs uppercase hover:opacity-70 transition-all
                ${themeStyles.textPrimary}
              `}
              title="Toggle Light/Dark Theme"
            >
              <span className="hidden md:inline">{isDark ? "Light_Mode" : "Dark_Mode"}</span>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={`
                p-2 border transition-all duration-300
                ${themeStyles.borderSecondary} hover:${themeStyles.borderPrimary}
                ${themeStyles.roundedBtn}
              `}
              title="System Configuration"
            >
              <Settings size={18} />
            </button>
          </div>
        </header>

        <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
          {!activePost ? (
            <>
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

                 {/* RENDER DYNAMIC HERO TITLE */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {BLOG_POSTS.map(post => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    onClick={setActivePost} 
                    isDark={isDark}
                    globalDecrypted={settings.globalDecrypted}
                    flickerOn={settings.flickerOn}
                    hoverGlitchOn={settings.hoverGlitchOn}
                    hoverDuration={settings.hoverDuration}
                    isSettingsOpen={isSettingsOpen}
                    themeMode={settings.themeMode}
                    themeStyles={themeStyles}
                  />
                ))}
              </div>
            </>
          ) : (
            <BlogPost 
              post={activePost} 
              onBack={() => setActivePost(null)}
              isDark={isDark}
              globalDecrypted={settings.globalDecrypted}
              animationsOn={settings.animationsOn}
              bootDuration={settings.bootDuration}
              themeMode={settings.themeMode}
              themeStyles={themeStyles}
            />
          )}
        </main>

        <footer className={`
          border-t py-8 text-center text-[10px] uppercase tracking-[0.2em] transition-colors
          ${themeStyles.borderSecondary} ${themeStyles.textMuted}
        `}>
          <div>
            {settings.themeMode === 'cute' ? 'Cuddle Timer: 100%' : 'System Uptime: 99.9%'}
          </div>
          <div className="mt-2">
            {settings.themeMode === 'cute' ? 'all secrets spilled' : 'No logs preserved'}
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;