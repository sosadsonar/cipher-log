import React from 'react';
import SnowflakeIcon from '../../../../assets/SnowflakeIcon';

const SnowParticle = ({ className, style, settings, isDark }) => {
  const multiplier = 6;
  const baseSize = settings?.cuteDustSize || 5;
  const size = baseSize * multiplier;

  const color = isDark ? '#cffafe' : '#0ea5e9'; 
  const glow = isDark
    ? 'drop-shadow(0 0 8px rgba(165, 243, 252, 0.8))'
    : 'drop-shadow(0 0 4px rgba(14, 165, 233, 0.3))';

  return (
    <div className={className} style={{ ...style, width: size, height: size, color, background: 'transparent' }}>
      <SnowflakeIcon 
        className="w-full h-full animate-spin-slow opacity-90"
        style={{ filter: glow, animationDuration: '5s' }}
      />
    </div>
  );
};

export default SnowParticle;