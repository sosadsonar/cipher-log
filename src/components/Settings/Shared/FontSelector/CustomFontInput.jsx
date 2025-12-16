import React from 'react';
import { Download } from 'lucide-react';

const CustomFontInput = ({ tempUrl, setTempUrl, handleImport, styles }) => {
  const { borderClass, hoverBorderClass, roundedClass, textClass, isDark } = styles;

  return (
    <div className={`mt-3 pt-3 border-t border-dashed ${borderClass} animate-in slide-in-from-top-2 duration-300`}>
      <div className="flex gap-2 items-end">
        <div className="flex-grow">
          <div className={`flex justify-between items-center mb-1 text-[10px] uppercase tracking-widest font-mono opacity-70 ${textClass}`}>
            <span className="flex items-center gap-2">URL (Google Fonts)</span>
          </div>
          <input 
            type="text" 
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="https://fonts.googleapis.com/css2?..."
            className={`
              w-full p-2 text-xs border bg-transparent focus:outline-none transition-all
              ${borderClass} focus:${hoverBorderClass} ${roundedClass} ${textClass}
            `}
          />
        </div>
        
        <button
          onClick={handleImport}
          className={`
            p-2 text-xs font-bold uppercase tracking-widest border transition-all
            ${borderClass} hover:${hoverBorderClass} ${roundedClass}
            ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}
            ${textClass}
          `}
          title="Import Font"
        >
          <Download size={16} />
        </button>
      </div>
      
      <div className={`text-[10px] mt-2 opacity-60 ${textClass}`}>
         Paste a Google Fonts URL and click Import to apply.
      </div>
    </div>
  );
};

export default CustomFontInput;