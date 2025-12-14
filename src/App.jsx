import React, { useState, useEffect } from 'react';
import { Hash, Wifi, Sun, Moon, Settings } from 'lucide-react';
import BlogCard from './components/BlogCard';
import BlogPost from './components/BlogPost';
import SettingsModal from './components/SettingsModal';
import { BLOG_POSTS } from './data';
import './index.css';

const App = () => {
  const [activePost, setActivePost] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Centralized Settings State with Durations
  const [settings, setSettings] = useState({
    globalDecrypted: false,
    animationsOn: true,
    bootDuration: 3.5, // Seconds
    flickerOn: true,
    flickerDuration: 7.0, // Seconds
    hoverGlitchOn: true,
    hoverDuration: 0.5 // Seconds
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

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

  return (
    <>
      <div 
        className={`
          min-h-screen relative overflow-x-hidden scanline font-mono selection:bg-red-500 selection:text-white
          transition-colors duration-700 ease-in-out
          ${isDark ? 'bg-[#050505] text-green-500' : 'bg-[#f0f2f5] text-slate-800'}
        `}
        style={{ '--flicker-duration': `${settings.flickerDuration}s` }}
      >
        
        {/* Settings Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          isDark={isDark}
          settings={settings}
          updateSetting={updateSetting}
        />

        {/* Ambient Noise */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
             }}>
        </div>

        {/* Header / HUD */}
        <header className={`
          fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between
          backdrop-blur-md border-b
          ${isDark ? 'bg-black/70 border-green-900/50' : 'bg-white/70 border-slate-300/50'}
        `}>
          <div className="flex items-center gap-2 group cursor-default">
            <div className={`p-2 border ${isDark ? 'border-green-500 bg-green-900/20' : 'border-slate-800 bg-slate-200'}`}>
               <Hash size={20} className="animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-widest leading-none">
                Zero_Day<span className="animate-pulse">_Log</span>
              </h1>
              <span className="text-[10px] opacity-60 uppercase">Encrypted Archive V.2.1.0</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Switch */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`
                flex items-center gap-2 text-xs uppercase hover:text-red-500 transition-colors
                ${isDark ? 'text-green-500' : 'text-slate-800'}
              `}
              title="Toggle Light/Dark Theme"
            >
              <span className="hidden md:inline">{isDark ? "Light_Mode" : "Dark_Mode"}</span>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Settings Button */}
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={`
                p-2 border rounded-sm transition-all duration-300
                ${isDark ? 'border-green-800 hover:bg-green-900/30 text-green-500' : 'border-slate-300 hover:bg-slate-200 text-slate-800'}
              `}
              title="System Configuration"
            >
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
          
          {!activePost ? (
            <>
              {/* Hero Section */}
              <div className="mb-16 text-center space-y-4">
                 <div className="inline-flex items-center gap-2 px-3 py-1 border border-dashed rounded-full text-xs uppercase opacity-70" style={{borderColor: isDark ? '#22c55e' : '#1e293b'}}>
                    <Wifi size={12} className="animate-pulse" />
                    <span>Secure Connection: False</span>
                    <span className="mx-2">|</span>
                    <span>Node: Localhost</span>
                 </div>
                 <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-4xl mx-auto glitch-hover`}>
                    Knowledge is <span className="line-through decoration-red-500">Power</span> <br />
                    <span className={`${isDark ? 'text-green-400' : 'text-slate-600'}`}>Control</span>
                 </h2>
                 <p className="max-w-xl mx-auto text-sm md:text-base opacity-70 leading-relaxed">
                   Accessing forbidden memory segments. Hover over data blocks to inject decryption keys. 
                   Proceed with caution. Content is obfuscated to bypass deep packet inspection.
                 </p>
              </div>

              {/* Grid Layout */}
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
            />
          )}

        </main>

        <footer className={`
          border-t py-8 text-center text-[10px] uppercase tracking-[0.2em]
          ${isDark ? 'border-green-900 text-green-800' : 'border-slate-300 text-slate-400'}
        `}>
          <div>System Uptime: 99.9%</div>
          <div className="mt-2">No logs preserved</div>
        </footer>

      </div>
    </>
  );
};

export default App;