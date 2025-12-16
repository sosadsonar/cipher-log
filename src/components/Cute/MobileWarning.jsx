import React from 'react';
import { Smartphone, X } from 'lucide-react';

const CuteMobileWarning = ({ onClose, isDark }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[9999] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className={`
        relative p-5 shadow-xl rounded-[1.5rem] border-2 flex flex-col gap-3
        ${isDark 
          ? 'bg-[#36202d]/95 border-pink-400/50 text-pink-200 backdrop-blur-md' 
          : 'bg-white/95 border-pink-200 text-rose-500 backdrop-blur-md'}
      `}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className={`
            absolute top-3 right-3 p-1 rounded-full transition-colors opacity-60 hover:opacity-100
            ${isDark ? 'hover:bg-pink-900/50' : 'hover:bg-pink-50'}
          `}
        >
          <X size={16} />
        </button>

        {/* Header with Icon */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-rose-100 text-rose-500'}`}>
            <Smartphone size={20} />
          </div>
          <h3 className="font-bold text-sm tracking-tight">Tiny Screen Detected!</h3>
        </div>
        
        {/* Content */}
        <p className="text-xs opacity-80 leading-relaxed">
          The magic sparkles look best on a big screen! Some effects might be hidden on your phone.
        </p>
        
        {/* Button */}
        <button 
          onClick={onClose}
          className={`
            mt-1 w-full py-2 text-xs font-bold rounded-xl transition-transform hover:scale-105 active:scale-95
            ${isDark 
              ? 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30' 
              : 'bg-rose-100 text-rose-600 hover:bg-rose-200'}
          `}
        >
          It's okay! ♡
        </button>
      </div>
    </div>
  );
};

export default CuteMobileWarning;