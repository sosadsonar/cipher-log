import React, { useMemo } from 'react';

// --- EMBEDDED ICONS to avoid import errors ---

const StarIcon = ({ className, style }) => (
  <svg 
    viewBox="0 0 100 120" 
    fill="currentColor" 
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
     <path d="M 50 0 Q 50 60 85 60 Q 50 60 50 120 Q 50 60 15 60 Q 50 60 50 0 Z" />
  </svg>
);

const SnowflakeIcon = ({ className, style }) => (
  <svg 
    viewBox="0 0 76 76" 
    fill="currentColor" 
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="currentColor" strokeWidth="0.2" strokeLinejoin="round" d="M 39.5833,26.3404L 42.0942,23.8296L 44.3333,26.0687L 39.5833,30.8187L 39.5833,35.2576L 43.4964,32.9984L 45.235,26.5098L 48.2938,27.3294L 47.3748,30.7592L 51.4598,28.4007L 52.9499,22.8398L 60.5968,24.8888L 58.5478,32.5357L 53.1406,31.0869L 48.8892,33.5414L 52.319,34.4604L 51.4994,37.5192L 45.0108,35.7806L 41.1667,38L 45.0108,40.2194L 51.4995,38.4808L 52.319,41.5396L 48.8892,42.4586L 53.1406,44.9131L 58.5478,43.4643L 60.5968,51.1112L 52.9499,53.1602L 51.4599,47.5993L 47.3748,45.2408L 48.2938,48.6706L 45.235,49.4902L 43.4964,43.0016L 39.5833,40.7424L 39.5833,45.1813L 44.3333,49.9313L 42.0942,52.1704L 39.5833,49.6596L 39.5833,54.5687L 43.5417,58.5271L 37.9437,64.125L 32.3458,58.5271L 36.4167,54.4562L 36.4167,49.7392L 33.9058,52.25L 31.6667,50.0108L 36.4167,45.2608L 36.4167,40.7424L 32.5725,42.9619L 30.8339,49.4505L 27.7751,48.6309L 28.6942,45.201L 24.4427,47.6556L 22.9939,53.0628L 15.347,51.0138L 17.396,43.3669L 22.9568,44.8569L 27.0419,42.4984L 23.6121,41.5794L 24.4317,38.5206L 30.9203,40.2592L 34.8334,38L 30.9203,35.7408L 24.4317,37.4794L 23.6121,34.4206L 27.0419,33.5016L 22.9568,31.1431L 17.3959,32.6331L 15.347,24.9862L 22.9939,22.9372L 24.4427,28.3444L 28.6942,30.799L 27.7751,27.3691L 30.8339,26.5495L 32.5725,33.0382L 36.4167,35.2576L 36.4167,30.7392L 31.6667,25.9892L 33.9058,23.75L 36.4167,26.2608L 36.4167,21.5438L 32.3458,17.4729L 37.9437,11.875L 43.5417,17.4729L 39.5833,21.4313L 39.5833,26.3404 Z M 35.7608,17.4167L 38,19.6559L 40.2392,17.4167L 38,15.1775L 35.7608,17.4167 Z M 35.7608,58.5833L 38,60.8225L 40.2392,58.5833L 38,56.3442L 35.7608,58.5833 Z M 19.0547,29.6475L 22.1135,28.8279L 21.2939,25.7692L 18.2351,26.5888L 19.0547,29.6475 Z M 54.7061,50.2308L 57.7649,49.4112L 56.9453,46.3525L 53.8865,47.1721L 54.7061,50.2308 Z M 54.7061,25.7692L 53.8865,28.8279L 56.9453,29.6475L 57.7649,26.5888L 54.7061,25.7692 Z M 19.0547,46.3525L 18.2351,49.4113L 21.2939,50.2309L 22.1135,47.1721L 19.0547,46.3525 Z "/>
  </svg>
);

// Render helper for different particle types
const ParticleShape = ({ type, className, style, settings }) => {
  // Base style for all particles
  const baseStyle = { ...style, background: 'transparent', boxShadow: 'none' };
  
  // Get base size from settings (default to 5 if undefined)
  const baseSize = settings?.cuteDustSize || 5; // Changed from 2

  if (type === 'stars') {
    // Multiplier for visibility
    const size = baseSize * 4; 
    return (
      <div className={`${className}`} style={{ ...baseStyle, width: size, height: size }}>
        <StarIcon 
          className="w-full h-full opacity-90 animate-pulse"
          style={{ 
             filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))',
             animationDuration: '2s' 
          }} 
        />
      </div>
    );
  }
  
  if (type === 'snow') {
    const size = baseSize * 4;
    return (
      <div className={`${className}`} style={{ ...baseStyle, width: size, height: size }}>
        <SnowflakeIcon 
          className="w-full h-full animate-spin-slow opacity-90"
          style={{ animationDuration: '4s' }}
        />
      </div>
    );
  }
  
  if (type === 'dust') {
    // Dust uses exact pixel size and simple circles
    return <div className={`${className} rounded-full bg-current`} style={{...style, width: `${baseSize}px`, height: `${baseSize}px`}} />;
  }
  
  // Default 'petals'
  const size = baseSize * 2;
  return <div className={`${className} petal`} style={{...style, width: `${size}px`, height: `${size}px`}} />;
};

const BackgroundEffects = ({ themeMode, isDark, settings }) => {
  
  const particleCount = settings?.cuteParticleDensity || 20;

  // Memoize particles so they don't regenerate on every render
  const particles = useMemo(() => {
    // Only generate if we are in cute mode
    if (themeMode !== 'cute') return [];
    
    // Safety check for settings
    if (!settings || !settings.cuteEffectsOn) return [];

    return Array.from({ length: particleCount }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      // Base duration divided by speed multiplier (Higher speed = Lower duration)
      baseDuration: 10 + Math.random() * 20, 
      animationDelay: `${Math.random() * 5}s`,
      isPetal: Math.random() > 0.7 // only used for default type variation
    }));
  }, [themeMode, settings?.cuteEffectsOn, particleCount]);

  // Hacker Mode Static
  if (themeMode === 'hacker') {
    return (
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    );
  }

  // Cute Mode Particles
  if (themeMode === 'cute') {
    if (!settings.cuteEffectsOn) return null;

    const speed = settings.cuteEffectSpeed || 1;

    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden cute-particles">
        {particles.map((p, i) => (
          <ParticleShape 
            key={i}
            type={settings.cuteParticleType || 'petals'}
            settings={settings} // Pass settings for size controls
            className={`particle ${isDark ? 'text-pink-300' : 'text-pink-400'}`}
            style={{
              left: p.left,
              animationDuration: `${p.baseDuration / speed}s`, 
              animationDelay: p.animationDelay,
              animationName: settings.cuteParticleType === 'stars' ? 'float-star' : undefined 
            }}
          />
        ))}
        {/* Inject custom keyframe for stars to reduce rotation */}
        <style>{`
          @keyframes float-star {
            0% { transform: translateY(-10vh) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(105vh) translateX(20px); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export default BackgroundEffects;