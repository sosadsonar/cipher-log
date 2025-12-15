import React, { useState, useEffect } from 'react';
import { Hash, Wifi, Sun, Moon, Settings, Globe, Monitor, Heart, FileText } from 'lucide-react';
import BlogCard from './components/BlogCard';
import BlogPost from './components/BlogPost';
import SettingsModal from './components/SettingsModal';
import MobileWarning from './components/MobileWarning';
import InstructionText from './components/InstructionText';
import { BLOG_POSTS, AVAILABLE_FONTS } from './data';
import { getThemeStyles } from './themes';
import './index.css';
import './hacker-effects.css'; // Importing separated hacker effects

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
  customFontFamily: '',
  themeMode: 'hacker' 
};

const App = () => {
  const [activePost, setActivePost] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [systemInfo, setSystemInfo] = useState({
    node: 'Initializing...',
    os: 'Analyzing...',
    ip: 'Tracing...',
    secure: false
  });

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const updateSetting = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      if (key === 'themeMode') {
        if (value === 'cute') newSettings.fontFamily = 'Quicksand (Cute)';
        else if (value === 'normal') newSettings.fontFamily = 'Inter (Normal)';
        else if (value === 'hacker') newSettings.fontFamily = 'Space Mono';
      }
      return newSettings;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Compute active theme styles
  const themeStyles = getThemeStyles(settings.themeMode, isDark);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

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

    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android|ipad|iphone|ipod|windows phone/i.test(userAgent)) {
        setShowMobileWarning(true);
      }
    };
    checkMobile();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Font Loader
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
          Welcome Friend! <br />
          <span className={`${themeStyles.textPrimary} opacity-80`}>Stay Cozy</span>
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
          /* Apply theme-specific class for CSS scoping */
          theme-${settings.themeMode}
          ${settings.themeMode === 'hacker' ? 'scanline font-mono selection:bg-red-500 selection:text-white' : ''}
          ${settings.themeMode === 'cute' ? 'font-sans selection:bg-pink-300 selection:text-white' : ''}
          ${settings.themeMode === 'normal' ? 'font-sans selection:bg-blue-300 selection:text-white' : ''}
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

        {/* Ambient Noise (Hacker Only) */}
        {settings.themeMode === 'hacker' && (
          <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
               }}>
          </div>
        )}

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
                Zero_Day<span className={`${settings.themeMode === 'hacker' ? 'animate-pulse' : ''}`}>_Log</span>
              </h1>
              <span className={`text-[10px] uppercase opacity-60`}>
                {settings.themeMode === 'hacker' && 'Encrypted Archive V.2.5.2'}
                {settings.themeMode === 'cute' && 'Kawaii Archive V.2.5.2'}
                {settings.themeMode === 'normal' && 'Personal Blog V.2.5.2'}
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
          <div>System Uptime: 99.9%</div>
          <div className="mt-2">No logs preserved</div>
        </footer>
      </div>
    </>
  );
};

export default App;