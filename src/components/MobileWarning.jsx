import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const MobileWarning = ({ onClose, isDark }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[9999] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className={`
        border-2 p-1 shadow-2xl relative
        ${isDark ? 'bg-black border-yellow-600' : 'bg-white border-yellow-500'}
      `}>
        {/* Inner Frame */}
        <div className={`
          p-4 border border-dashed flex flex-col gap-3
          ${isDark ? 'border-yellow-800/50 bg-yellow-900/10' : 'border-yellow-300 bg-yellow-50'}
        `}>
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className={`flex items-center gap-2 font-bold uppercase tracking-widest text-xs ${isDark ? 'text-yellow-500' : 'text-yellow-700'}`}>
              <AlertTriangle size={16} className="animate-pulse" />
              <span>Hardware_Mismatch</span>
            </div>
            <button 
              onClick={onClose}
              className={`hover:text-red-500 transition-colors ${isDark ? 'text-yellow-600' : 'text-yellow-700'}`}
            >
              <X size={16} />
            </button>
          </div>

          {/* Message */}
          <div className={`text-xs font-mono leading-relaxed ${isDark ? 'text-yellow-100/80' : 'text-yellow-900/80'}`}>
            <p className="mb-2">
              <strong className="text-yellow-500">&gt; WARNING:</strong> Mobile OS detected. 
            </p>
            <p>
              GPU acceleration and visual artifacts (scrambling/flicker) are optimized for desktop terminals. 
              Experience may be compromised on handheld devices.
            </p>
          </div>

          {/* Action Button */}
          <button 
            onClick={onClose}
            className={`
              w-full py-2 text-[10px] uppercase tracking-widest font-bold border hover:bg-yellow-500 hover:text-black transition-all
              ${isDark ? 'border-yellow-600 text-yellow-500' : 'border-yellow-500 text-yellow-700'}
            `}
          >
            Acknowledge & Proceed
          </button>
          
        </div>

        {/* Decorative corner */}
        <div className={`absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 ${isDark ? 'border-yellow-500' : 'border-yellow-600'}`}></div>
        <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 ${isDark ? 'border-yellow-500' : 'border-yellow-600'}`}></div>
      </div>
    </div>
  );
};

export default MobileWarning;