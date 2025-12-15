import React, { useState, useEffect } from 'react';
import { Terminal, Lock, Unlock, FileText, Heart } from 'lucide-react';
import { encryptText } from '../utils';

const BlogCard = ({ post, onClick, isDark, globalDecrypted, flickerOn, hoverGlitchOn, hoverDuration, isSettingsOpen, themeMode, themeStyles }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState(post.title);
  const [displayedSummary, setDisplayedSummary] = useState(post.summary);
  // Random delay for passive flicker so cards don't pulse in unison
  const [animDelay] = useState(() => Math.random() * 7);

  useEffect(() => {
    // IF NOT HACKER MODE: Disable all scrambling visuals. Text is always clear.
    if (themeMode !== 'hacker') {
      setDisplayedTitle(post.title);
      setDisplayedSummary(post.summary);
      return;
    }

    // --- HACKER MODE LOGIC ---
    
    // 1. GLOBAL DECRYPTION MODE
    if (globalDecrypted) {
      if (isSettingsOpen) {
        // Settings Open: Keep encrypted so user sees reveal when closed
        setDisplayedTitle(encryptText(post.title));
        setDisplayedSummary(encryptText(post.summary));
      } else {
        // Settings Closed: Reveal content
        // CHECK: If already clear, do nothing (prevents loop/re-scramble)
        if (displayedTitle === post.title && displayedSummary === post.summary) return;

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
      return;
    }

    // 2. STANDARD HOVER INTERACTION
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
      // Not hovered + Not Global Decrypted = Encrypted
      setDisplayedTitle(encryptText(post.title));
      setDisplayedSummary(encryptText(post.summary));
    }
    
    // Dependencies trimmed to avoid infinite loops
  }, [isHovered, globalDecrypted, post.title, post.summary, hoverDuration, isSettingsOpen, themeMode]);

  // --- RENDER HELPERS ---
  const getIcon = () => {
    if (themeMode === 'cute') return <Heart size={14} className={isHovered ? 'fill-current' : ''} />;
    if (themeMode === 'normal') return <FileText size={14} />;
    return <Terminal size={14} />;
  };

  const getStatusIcon = () => {
    if (themeMode !== 'hacker') return null;
    return globalDecrypted || isHovered ? <Unlock size={10} /> : <Lock size={10} />;
  };

  // Helper for the ID label
  const getIdLabel = () => {
    if (themeMode === 'hacker') return `DATA_BLOCK_${post.id}`;
    if (themeMode === 'cute') return `Sweet Note #${post.id}`; // Changed Label
    return `Post #${post.id}`;
  };

  return (
    <div 
      onClick={() => onClick(post)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative overflow-hidden cursor-pointer
        border transition-all duration-300 flex flex-col justify-between p-6
        ${themeStyles.cardBg}
        ${isHovered ? `${themeStyles.borderPrimary}` : `${themeStyles.borderSecondary}`}
        ${themeStyles.rounded}
        backdrop-blur-sm shadow-sm hover:shadow-lg
        ${themeMode === 'cute' ? 'pillow-pop' : ''}
      `}
    >
      {/* Glitch Overlay (Hacker Only) */}
      {themeMode === 'hacker' && (
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-repeat ${isDark ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMjJjNTVlIiAvPgo8L3N2Zz4=")]' : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=")]'}`}></div>
      )}

      {/* WRAPPER for Pillow Pop Text Float Effect (Cute Mode) */}
      <div className={themeMode === 'cute' ? 'pillow-content' : ''}>
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
            /* Blur effect if encrypted */
            ${themeMode === 'hacker' && !globalDecrypted && !isHovered ? 'opacity-60 blur-[0.5px]' : 'opacity-100'}
            
            /* Glitch effect only on hover (if enabled) */
            ${themeMode === 'hacker' && isHovered && hoverGlitchOn ? 'glitch-hover' : ''}
            
            /* Flicker effect (passive noise) - Works even if decrypted, unless hovered */
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

      <div className={`
        mt-4 pt-4 border-t flex items-center justify-between
        transition-opacity duration-300
        ${themeStyles.borderSecondary}
        ${themeStyles.borderDashed}
        ${themeMode === 'hacker' ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-50 group-hover:opacity-100'}
      `}>
        <span className={`text-xs uppercase ${themeMode === 'hacker' ? 'animate-pulse' : ''}`}>
           {themeMode === 'hacker' ? '> Initialize_Read_Sequence' : 'Read Article'}
        </span>
        {getIcon()}
      </div>

      {themeMode === 'hacker' && (
        <>
          <div className={`absolute top-0 right-0 p-1 border-b border-l ${themeStyles.borderPrimary}`}></div>
          <div className={`absolute bottom-0 left-0 p-1 border-t border-r ${themeStyles.borderPrimary}`}></div>
        </>
      )}
    </div>
  );
};

export default BlogCard;