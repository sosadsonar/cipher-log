import React from 'react';

const DustParticle = ({ className, style, settings, isDark }) => {
  // Config
  const multiplier = 1;
  const baseSize = settings?.cuteDustSize || 5;
  const size = baseSize * multiplier;

  // Visuals
  const color = isDark ? '#e2e8f0' : '#64748b'; // White / Slate
  const glow = isDark ? '0 0 6px 1px rgba(255, 255, 255, 0.3)' : 'none';

  return (
    <div 
      className={`${className} rounded-full`} 
      style={{
        ...style, 
        width: `${size}px`, 
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: glow
      }} 
    />
  );
};

export default DustParticle;