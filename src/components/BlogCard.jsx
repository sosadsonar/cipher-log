import React, { useState, useEffect } from 'react';
import { Terminal, Lock, Unlock } from 'lucide-react';
import { encryptText } from '../utils';

const BlogCard = ({ post, onClick, isDark, globalDecrypted, flickerOn, hoverGlitchOn, hoverDuration }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedSummary, setDisplayedSummary] = useState("");
  // Random delay for passive flicker
  const [animDelay] = useState(() => Math.random() * 7);

  useEffect(() => {
    if (globalDecrypted) {
      setDisplayedTitle(post.title);
      setDisplayedSummary(post.summary);
      return;
    }

    if (isHovered) {
      let startTime = Date.now();
      const duration = hoverDuration * 1000; // Convert to ms
      
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
  }, [isHovered, globalDecrypted, post.title, post.summary, hoverDuration]);

  return (
    <div 
      onClick={() => onClick(post)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative overflow-hidden cursor-pointer
        border transition-all duration-300
        ${isDark 
          ? 'border-green-900 bg-black/40 hover:bg-green-900/10 hover:border-green-500' 
          : 'border-slate-300 bg-white/60 hover:bg-slate-200/50 hover:border-slate-800'
        }
        min-h-[200px] flex flex-col justify-between p-6
        backdrop-blur-sm
      `}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-repeat ${isDark ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMjJjNTVlIiAvPgo8L3N2Zz4=")]' : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=")]'}`}></div>

      <div>
        <div className={`text-xs uppercase tracking-widest mb-2 flex justify-between ${isDark ? 'text-green-700' : 'text-slate-400'}`}>
           <span className="flex items-center gap-1">
             {globalDecrypted || isHovered ? <Unlock size={10} /> : <Lock size={10} />}
             DATA_BLOCK_{post.id}
           </span>
           <span>{post.date}</span>
        </div>
        
        <h3 
          style={{ animationDelay: isHovered ? '0s' : `${animDelay}s` }}
          className={`
            text-xl font-bold mb-4 font-mono break-words
            ${!globalDecrypted && !isHovered 
              ? `opacity-60 blur-[0.5px] ${flickerOn ? 'flicker' : ''}` 
              : `opacity-100 ${hoverGlitchOn ? 'glitch-hover' : ''}`
            }
            ${isDark ? 'text-green-400' : 'text-slate-900'}
        `}>
          {displayedTitle}
        </h3>
        
        <p className={`
          text-sm font-mono leading-relaxed break-words
          ${!globalDecrypted && !isHovered ? 'opacity-40 blur-[0.5px]' : 'opacity-80'}
          ${isDark ? 'text-green-200' : 'text-slate-600'}
        `}>
          {displayedSummary}
        </p>
      </div>

      <div className={`
        mt-4 pt-4 border-t border-dashed flex items-center justify-between
        transition-opacity duration-300
        ${isDark ? 'border-green-900' : 'border-slate-300'}
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        <span className="text-xs uppercase animate-pulse">
           &gt; Initialize_Read_Sequence
        </span>
        <Terminal size={14} />
      </div>
      <div className={`absolute top-0 right-0 p-1 border-b border-l ${isDark ? 'border-green-500' : 'border-slate-800'}`}></div>
      <div className={`absolute bottom-0 left-0 p-1 border-t border-r ${isDark ? 'border-green-500' : 'border-slate-800'}`}></div>
    </div>
  );
};

export default BlogCard;