import React, { useState, useEffect } from 'react';
import { Hash, Wifi, Sun, Moon, Settings, Globe, Monitor } from 'lucide-react';
import BlogCard from './components/BlogCard';
import BlogPost from './components/BlogPost';
import SettingsModal from './components/SettingsModal';
import MobileWarning from './components/MobileWarning';
import InstructionText from './components/InstructionText';
import { BLOG_POSTS, AVAILABLE_FONTS } from './data';
import './index.css';

// Define defaults outside component to reuse for reset logic
const DEFAULT_SETTINGS = {
  globalDecrypted: false,
  animationsOn: true,
  bootDuration: 3.5,
  flickerOn: true,
  flickerDuration: 7.0,
  hoverGlitchOn: true,
  hoverDuration: 0.5,
  fontFamily: 'Space Mono',
  customFontOn: false,
  customFontUrl: '',
  customFontFamily: ''
};

const App = () => {
  const [activePost, setActivePost] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Mobile Detection State
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  // System Diagnostics State
  const [systemInfo, setSystemInfo] = useState({
    node: 'Initializing...',
    os: 'Analyzing...',
    ip: 'Tracing...',
    secure: false
  });

  // Centralized Settings State (Initialized with Defaults)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Reset Logic
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  useEffect(() => {
    // 1. Mouse Parallax
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 2. System Diagnostics (Node, OS, IP)
    const runDiagnostics = async () => {
      const hostname = window.location.hostname;
      const isSecure = window.location.protocol === 'https:';
      
      let osName = "Unknown Shell";
      const ua = navigator.userAgent;
      if (ua.indexOf("Win") !== -1) osName = "Windows NT";
      if (ua.indexOf("Mac") !== -1) osName = "MacOS";
      if (ua.indexOf("Linux") !== -1) osName = "Linux Kernel";
      if (ua.indexOf("Android") !== -1) osName = "Android OS";
      if (ua.indexOf("like Mac") !== -1) osName = "iOS";

      setSystemInfo(prev => ({
        ...prev,
        node: hostname === 'localhost' || hostname === '127.0.0.1' ? 'Localhost' : hostname,
        os: osName,
        secure: isSecure
      }));

      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setSystemInfo(prev => ({ ...prev, ip: data.ip }));
      } catch (e) {
        setSystemInfo(prev => ({ ...prev, ip: '::1 (Hidden)' }));
      }
    };
    runDiagnostics();

    // 3. Mobile OS Detection
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android|ipad|iphone|ipod|windows phone/i.test(userAgent)) {
        setShowMobileWarning(true);
      }
    };
    checkMobile();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- FONT LOADING LOGIC ---
  useEffect(() => {
    const linkId = 'dynamic-font-link';
    let link = document.getElementById(linkId);
    
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (settings.customFontOn && settings.customFontUrl) {
      link.href = settings.customFontUrl;
    } else {
      const fontData = AVAILABLE_FONTS.find(f => f.name === settings.fontFamily);
      if (fontData && fontData.url) {
        link.href = fontData.url;
      } else {
        link.removeAttribute('href');
      }
    }
  }, [settings.fontFamily, settings.customFontOn, settings.customFontUrl]);

  const getActiveFontFamily = () => {
    if (settings.customFontOn && settings.customFontFamily) {
      return settings.customFontFamily;
    }
    const fontData = AVAILABLE_FONTS.find(f => f.name === settings.fontFamily);
    return fontData ? fontData.family : 'monospace';
  };

  return (
    <>
      <div 
        className={`
          min-h-screen relative overflow-x-hidden scanline font-mono selection:bg-red-500 selection:text-white
          transition-colors duration-700 ease-in-out
          ${isDark ? 'bg-[#050505] text-green-500' : 'bg-[#f0f2f5] text-slate-800'}
        `}
        style={{ 
          '--flicker-duration': `${settings.flickerDuration}s`,
          fontFamily: getActiveFontFamily() 
        }}
      >
        
        {showMobileWarning && (
          <MobileWarning 
            onClose={() => setShowMobileWarning(false)} 
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

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
             }}>
        </div>

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
              <span className="text-[10px] opacity-60 uppercase">Encrypted Archive V.2.3.3</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
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

        <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
          {!activePost ? (
            <>
              <div className="mb-16 text-center space-y-4">
                 
                 <div className={`
                   inline-flex flex-col items-center gap-2 px-6 py-3 border border-dashed rounded text-xs uppercase opacity-80 transition-colors duration-500
                   ${isDark ? 'border-green-500/50 text-green-500/80 bg-green-900/5' : 'border-slate-400/50 text-slate-600 bg-slate-100'}
                 `}>
                    <div className="flex items-center gap-3 w-full justify-center">
                       <Wifi size={12} className={systemInfo.secure ? "text-green-500" : "animate-pulse text-red-500"} />
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

                 <h2 className={`mt-8 text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-4xl mx-auto glitch-hover`}>
                    Knowledge is <span className="line-through decoration-red-500">Power</span> <br />
                    <span className={`${isDark ? 'text-green-400' : 'text-slate-600'}`}>Control</span>
                 </h2>
                 <p className="max-w-xl mx-auto text-sm md:text-base opacity-70 leading-relaxed transition-all duration-300">
                   Accessing forbidden memory segments.{" "}
                   
                   {/* Modular Instruction Component */}
                   <InstructionText 
                     globalDecrypted={settings.globalDecrypted} 
                     isSettingsOpen={isSettingsOpen} 
                   />
                   
                   {" "}Proceed with caution. Content is obfuscated to bypass deep packet inspection.
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