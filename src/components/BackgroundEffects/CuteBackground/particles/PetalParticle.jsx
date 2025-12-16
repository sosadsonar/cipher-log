import React from 'react';

const PetalParticle = ({ className, style, settings, isDark }) => {
  const multiplier = 2;
  const baseSize = settings?.cuteDustSize || 5;
  const size = baseSize * multiplier;

  const color = isDark ? undefined : '#fb7185'; 
  const glow = isDark 
    ? '0 0 10px rgba(244, 114, 182, 0.6)' 
    : '0 0 5px rgba(225, 29, 72, 0.2)';

  return (
    <div 
      className={`${className} petal`} 
      style={{
        ...style, width: size, height: size, backgroundColor: color, boxShadow: glow
      }} 
    />
  );
};

export default PetalParticle;