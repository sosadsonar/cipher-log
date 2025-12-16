import React, { useState, useEffect } from 'react';
import { Terminal, Lock, Unlock, FileText, Heart } from 'lucide-react';
import { encryptText } from '../utils';

const BlogCard = ({ post, onClick, isDark, globalDecrypted, flickerOn, hoverGlitchOn, hoverDuration, isSettingsOpen, themeMode, themeStyles }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState(post.title);
  const [displayedSummary, setDisplayedSummary] = useState(post.summary);
  const [animDelay] = useState(() => Math.random() * 7);
  
  // State for Confetti Particles
  const [confetti, setConfetti] = useState([]);

  // EFFECT: Confetti Pop (Cute Mode)
  useEffect(() => {
    if (themeMode !== 'cute') {
      setConfetti([]);
      return;
    }

    if (isHovered) {
      // Generate a burst of confetti with randomized physics
      const count = 25; // Increase count
      const newConfetti = Array.from({ length: count }).map((_, i) => {
        // Start from roughly the center-top area to "pop" out
        const startX = Math.random() * 60 + 20; // 20% to 80%
        const startY = Math.random() * 30 + 10; // 10% to 40%

        // Physics variables for CSS
        // Wider spread on X, Stronger pop on Y
        const vx = (Math.random() - 0.5) * 150; 
        const vy = -(Math.random() * 60 + 40);  
        const rot = Math.random() * 360;       

        return {
          id: Date.now() + i,
          top: startY,
          left: startX,
          width: Math.random() * 8 + 6,  // Larger particles
          height: Math.random() * 6 + 4, 
          // Vibrant pastel colors
          color: ['#f472b6', '#22d3ee', '#fb7185', '#fde047', '#c084fc', '#4ade80'][Math.floor(Math.random() * 6)],
          vx: `${vx}px`,
          vy: `${vy}px`,
          rot: `${rot}deg`,
          delay: Math.random() * 0.15
        };
      });
      setConfetti(newConfetti);

      // Cleanup: Wait for animation (1.8s) + max delay (0.15s) -> 2000ms safe buffer
      const timer = setTimeout(() => {
        setConfetti([]);
      }, 2000); 
      return () => clearTimeout(timer);
    } else {
      setConfetti([]);
    }
  }, [isHovered, themeMode]);

  // EFFECT: Text Scrambling (Hacker Mode)
  useEffect(() => {
    if (themeMode !== 'hacker') {
      setDisplayedTitle(post.title);
      setDisplayedSummary(post.summary);
      return;
    }

    if (globalDecrypted) {
      if (isSettingsOpen) {
        setDisplayedTitle(encryptText(post.title));
        setDisplayedSummary(encryptText(post.summary));
      } else {
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
      setDisplayedTitle(encryptText(post.title));
      setDisplayedSummary(encryptText(post.summary));
    }
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

  const getIdLabel = () => {
    if (themeMode === 'hacker') return `DATA_BLOCK_${post.id}`;
    if (themeMode === 'cute') return `Sweet Note #${post.id}`;
    return `Post #${post.id}`;
  };

  return (
    <div 
      onClick={() => onClick(post)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative cursor-pointer
        border transition-all duration-300 flex flex-col justify-between p-6
        ${themeStyles.cardBg}
        ${isHovered ? `${themeStyles.borderPrimary}` : `${themeStyles.borderSecondary}`}
        ${themeStyles.rounded}
        backdrop-blur-sm shadow-sm hover:shadow-lg
        ${themeMode === 'cute' ? 'pillow-pop overflow-visible' : 'overflow-hidden'} /* Explicit overflow-visible for cute */
      `}
    >
      {/* Glitch Overlay (Hacker Only) */}
      {themeMode === 'hacker' && (
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-repeat ${isDark ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMjJjNTVlIiAvPgo8L3N2Zz4=")]' : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=")]'}`}></div>
      )}

      {/* Confetti Particles (Cute Only) */}
      {themeMode === 'cute' && confetti.map(c => (
        <div
          key={c.id}
          className="absolute pointer-events-none animate-confetti"
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            width: `${c.width}px`,
            height: `${c.height}px`,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
            // Pass physics vars to CSS
            '--vx': c.vx,
            '--vy': c.vy,
            '--rot': c.rot,
            zIndex: 50, // Ensure it's above card text
            borderRadius: '2px', // Slight rounding for "paper" feel
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)' // Tiny shadow for depth
          }}
        />
      ))}

      {/* WRAPPER for Pillow Pop Text Float Effect (Cute Mode) */}
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

      <div className={`
        mt-4 pt-4 border-t flex items-center justify-between
        transition-opacity duration-300 z-10 relative
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
