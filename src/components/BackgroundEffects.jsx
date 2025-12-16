import React, { useEffect, useRef, useMemo } from 'react';
import { PARTICLE_COMPONENTS } from './Settings/particles';

const BackgroundEffects = ({ themeMode, isDark, settings }) => {
  const canvasRef = useRef(null);
  const particleCount = settings?.cuteParticleDensity || 20;

  // 1. EFFECT: Hacker Matrix Rain
  useEffect(() => {
    if (themeMode !== 'hacker' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const cols = Math.floor(width / 20);
    const ypos = Array(cols).fill(0);

    const matrix = () => {
      ctx.fillStyle = isDark ? '#0001' : '#fff1'; 
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = isDark ? '#22c55e' : '#000'; 
      ctx.font = '14pt monospace';

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });
    };

    const interval = setInterval(matrix, 50);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [themeMode, isDark]);

  // 2. MEMO: Cute Particles Generation
  const particles = useMemo(() => {
    if (themeMode !== 'cute') return [];
    if (!settings || !settings.cuteEffectsOn) return [];

    return Array.from({ length: particleCount }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      baseDuration: 10 + Math.random() * 20, 
      animationDelay: `${Math.random() * 5}s`
    }));
  }, [themeMode, settings?.cuteEffectsOn, particleCount]);

  // --- RENDER ---
  
  if (themeMode === 'hacker') {
    return (
      <>
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        <canvas 
          ref={canvasRef} 
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-10"
        />
      </>
    );
  }

  if (themeMode === 'cute') {
    if (!settings.cuteEffectsOn) return null;
    
    const speed = settings.cuteEffectSpeed || 1;
    const currentType = settings.cuteParticleType || 'petals';
    const ParticleComponent = PARTICLE_COMPONENTS[currentType] || PARTICLE_COMPONENTS.petals;
    
    // Base class fallback
    const baseTextColor = isDark ? 'text-pink-300' : 'text-rose-500';

    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden cute-particles">
        {particles.map((p, i) => (
          <ParticleComponent 
            key={i}
            settings={settings}
            isDark={isDark}
            className={`particle ${baseTextColor}`}
            style={{
              left: p.left,
              animationDuration: `${p.baseDuration / speed}s`, 
              animationDelay: p.animationDelay,
              animationName: currentType === 'stars' ? 'float-star' : undefined
            }}
          />
        ))}
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