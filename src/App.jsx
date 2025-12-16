import React, { useState, useEffect } from 'react';

// --- LAYOUT COMPONENTS ---
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Layout/Hero';

// --- CORE COMPONENTS ---
import BlogCard from './components/BlogCard'; 
import BlogPost from './components/BlogPost'; 

import MobileWarning from './components/MobileWarning';
import SettingsModal from './components/Settings/SettingsModal';
import BackgroundEffects from './components/BackgroundEffects';

// --- DATA ---
import { BLOG_POSTS } from './data';

// --- HOOKS ---
import { useSettings } from './hooks/useSettings';
import { useSystemDiagnostics } from './hooks/useSystemDiagnostics';
import { useFontLoader } from './hooks/useFontLoader';

const App = () => {
  const [activePost, setActivePost] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Initialize Hooks
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

        <BackgroundEffects themeMode={settings.themeMode} isDark={isDark} settings={settings} />

        <Header 
          themeStyles={themeStyles} 
          isDark={isDark} 
          settings={settings}
          setIsDark={setIsDark}
          setIsSettingsOpen={setIsSettingsOpen}
        />

        <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
          {!activePost ? (
            <>
              <Hero 
                themeStyles={themeStyles}
                settings={settings}
                isDark={isDark}
                systemInfo={systemInfo}
                isSettingsOpen={isSettingsOpen}
              />

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
                    cuteConfettiOn={settings.cuteConfettiOn}
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

        <Footer themeStyles={themeStyles} settings={settings} />
      </div>
    </>
  );
};

export default App;