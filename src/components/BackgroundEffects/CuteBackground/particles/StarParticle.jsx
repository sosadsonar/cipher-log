import React from 'react';
import StarIcon from '../../../../assets/StarIcon';

const StarParticle = ({ className, style, settings, isDark }) => {
  const multiplier = 6;
  const baseSize = settings?.cuteDustSize || 5;
  const size = baseSize * multiplier;

  const color = isDark ? '#fde047' : '#d97706'; 
  const glow = isDark 
    ? 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.6))' 
    : 'drop-shadow(0 0 4px rgba(217, 119, 6, 0.3))';

  return (
    <div className={className} style={{ ...style, width: size, height: size, color, background: 'transparent' }}>
      <StarIcon 
        className="w-full h-full opacity-90 animate-pulse"
        style={{ filter: glow, animationDuration: '3s' }} 
      />
    </div>
  );
};

export default StarParticle;