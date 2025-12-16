import React, { useState } from 'react';
import { fireRealisticConfetti } from '../../utils/confetti';
import CardContent from './CardContent';
import CardFooter from './CardFooter';
import HackerOverlay from './HackerOverlay';

const BlogCard = ({ 
  post, 
  onClick, 
  isDark, 
  globalDecrypted, 
  flickerOn, 
  hoverGlitchOn, 
  hoverDuration, 
  isSettingsOpen, 
  themeMode, 
  themeStyles, 
  cuteConfettiOn 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // --- MOUSE HANDLER: Trigger Confetti ---
  const handleMouseEnter = (e) => {
    setIsHovered(true);

    if (themeMode === 'cute' && cuteConfettiOn) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      fireRealisticConfetti(x, y);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      onClick={() => onClick(post)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative cursor-pointer
        border transition-all duration-300 flex flex-col justify-between p-6
        ${themeStyles.cardBg}
        ${isHovered ? `${themeStyles.borderPrimary}` : `${themeStyles.borderSecondary}`}
        ${themeStyles.rounded}
        backdrop-blur-sm shadow-sm hover:shadow-lg
        ${themeMode === 'cute' ? 'pillow-pop' : ''}
        /* overflow-hidden needed for hacker scanlines, but visible for cute shadow effects */
        ${themeMode === 'hacker' ? 'overflow-hidden' : ''}
      `}
    >
      <HackerOverlay 
        themeMode={themeMode} 
        isDark={isDark} 
        themeStyles={themeStyles} 
      />

      <CardContent 
        post={post}
        isHovered={isHovered}
        globalDecrypted={globalDecrypted}
        isSettingsOpen={isSettingsOpen}
        themeMode={themeMode}
        themeStyles={themeStyles}
        flickerOn={flickerOn}
        hoverGlitchOn={hoverGlitchOn}
        hoverDuration={hoverDuration}
      />

      <CardFooter 
        themeMode={themeMode} 
        isHovered={isHovered} 
        themeStyles={themeStyles} 
      />
    </div>
  );
};

export default BlogCard;