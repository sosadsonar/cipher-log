import React, { useMemo } from 'react';
import { PARTICLE_COMPONENTS } from './particles';

const CuteBackground = ({ isDark, settings }) => {
  if (!settings.cuteEffectsOn) return null;

  const particleCount = settings.cuteParticleDensity || 20;
  const speed = settings.cuteEffectSpeed || 1;
  const currentType = settings.cuteParticleType || 'petals';
  
  // Select the component based on settings
  const ParticleComponent = PARTICLE_COMPONENTS[currentType] || PARTICLE_COMPONENTS.petals;
  
  // Base class fallback
  const baseTextColor = isDark ? 'text-pink-300' : 'text-rose-500';

  // Memoize particle data generation
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      baseDuration: 10 + Math.random() * 20, 
      animationDelay: `${Math.random() * 5}s`
    }));
  }, [particleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden cute-particles">
      {particles.map((p) => (
        <ParticleComponent 
          key={p.id}
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
};

export default CuteBackground;