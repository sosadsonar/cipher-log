import React, { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { encryptText } from '../../utils';
import { useTranslation } from 'react-i18next';

const CardContent = ({ 
  post, 
  isHovered, 
  globalDecrypted, 
  isSettingsOpen, 
  themeMode, 
  themeStyles,
  flickerOn,
  hoverGlitchOn,
  hoverDuration
}) => {
  const {t} = useTranslation();
  const [displayedTitle, setDisplayedTitle] = useState(post.title);
  const [displayedSummary, setDisplayedSummary] = useState(post.summary);
  // Passive delay for cute animations
  const [animDelay] = useState(() => Math.random() * 7);

  // --- EFFECT: Text Scrambling Logic ---
  useEffect(() => {
    // 1. Non-Hacker Modes: Text is always clear
    if (themeMode !== 'hacker') {
      setDisplayedTitle(post.title);
      setDisplayedSummary(post.summary);
      return;
    }

    // 2. Global Decryption Enabled
    if (globalDecrypted) {
      // Check if already decrypted to avoid re-running animation (e.g. when settings open/close)
      if (displayedTitle === post.title && displayedSummary === post.summary) return;
      
      // Run decryption animation (e.g. when toggle is just flipped)
      let startTime = Date.now();
      const duration = hoverDuration * 1000; 
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= duration) {
          setDisplayedTitle(post.title);
          setDisplayedSummary(post.summary);
          clearInterval(interval);
        } else {
          setDisplayedTitle(encryptText(post.title));
          setDisplayedSummary(encryptText(post.summary));
        }
      }, 50);
      return () => clearInterval(interval);
    }

    // 3. Hover Interaction (Only if NOT globally decrypted)
    if (isHovered) {
      let startTime = Date.now();
      const duration = hoverDuration * 1000;
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= duration) {
          setDisplayedTitle(post.title);
          setDisplayedSummary(post.summary);
          clearInterval(interval);
        } else {
          setDisplayedTitle(encryptText(post.title));
          setDisplayedSummary(encryptText(post.summary));
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      // 4. Default State: Encrypted
      setDisplayedTitle(encryptText(post.title));
      setDisplayedSummary(encryptText(post.summary));
    }
  }, [isHovered, globalDecrypted, isSettingsOpen, themeMode, post.title, post.summary, hoverDuration]);

  // --- HELPERS ---
  const getStatusIcon = () => {
    if (themeMode !== 'hacker') return null;
    return globalDecrypted || isHovered ? <Unlock size={10} /> : <Lock size={10} />;
  };

  const getIdLabel = () => {
    if (themeMode === 'hacker') return `${t('card.id_hacker')}${post.id}`;
    if (themeMode === 'cute') return `${t('card.id_cute')}${post.id}`;
    return `${t('card.id_normal')}${post.id}`;
  };

  return (
    <div className={`relative ${themeMode === 'cute' ? 'pillow-content' : ''} z-10`}>
      <div className={`text-xs uppercase tracking-widest mb-2 flex justify-between ${themeStyles.textMuted}`}>
         <span className="flex items-center gap-1">
           {getStatusIcon()}
           {getIdLabel()}
         </span>
         <span>{post.date}</span>
      </div>
      
      <h3 
        style={{ animationDelay: isHovered ? '0s' : `${animDelay}s` }}
        className={`
          text-xl font-bold mb-4 break-words
          ${themeStyles.textSecondary}
          ${themeMode === 'hacker' && !globalDecrypted && !isHovered ? 'opacity-60 blur-[0.5px]' : 'opacity-100'}
          ${themeMode === 'hacker' && isHovered && hoverGlitchOn ? 'glitch-hover' : ''}
          ${themeMode === 'hacker' && flickerOn && !isHovered ? 'flicker' : ''}
      `}>
        {displayedTitle}
      </h3>
      
      <p className={`
        text-sm leading-relaxed break-words
        ${themeStyles.textPrimary}
        ${themeMode === 'hacker' && !globalDecrypted && !isHovered ? 'opacity-40 blur-[0.5px]' : 'opacity-80'}
      `}>
        {displayedSummary}
      </p>
    </div>
  );
};

export default CardContent;