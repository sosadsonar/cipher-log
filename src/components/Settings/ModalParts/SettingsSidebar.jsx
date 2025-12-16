import React from 'react';
import { Palette, Monitor, Type, RotateCcw } from 'lucide-react';

export const CATEGORIES = [
  { id: 'theme', label: 'Theme', icon: <Palette size={14} /> },
  { id: 'visual', label: 'Visual FX', icon: <Monitor size={14} /> },
  { id: 'typography', label: 'Typography', icon: <Type size={14} /> },
];

const SettingsSidebar = ({ 
  activeCategory, 
  setActiveCategory, 
  resetSettings, 
  setDescription, 
  isDark, 
  themeStyles, 
  isCute 
}) => {
  return (
    <div className={`
      w-full md:w-32 flex-shrink-0 flex flex-row md:flex-col 
      border-b md:border-b-0 md:border-r 
      ${themeStyles.borderSecondary} 
      ${isDark ? 'bg-white/5' : 'bg-black/5'}
    `}>
      <div className="flex-grow flex md:flex-col overflow-x-auto">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              flex-1 md:flex-none p-3 md:p-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center md:text-left flex flex-col gap-2 transition-all items-center md:items-start
              whitespace-nowrap
              ${activeCategory === cat.id 
                ? (isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black') 
                : `${themeStyles.textMuted} hover:opacity-100`}
            `}
            style={activeCategory === cat.id ? { backgroundColor: themeStyles.accentColor, color: isDark ? '#000' : '#fff' } : {}}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      <div className={`hidden md:block p-4 border-t ${themeStyles.borderSecondary}`}>
         <button
           onClick={resetSettings}
           onMouseEnter={() => setDescription("WARNING: Resets all system configurations to factory defaults.")}
           className={`
             w-full flex flex-col items-center gap-2 text-[10px] uppercase font-bold py-3 border transition-all duration-300
             ${isDark ? 'border-red-900 text-red-500 hover:bg-red-900/30' : 'border-red-300 text-red-600 hover:bg-red-50'}
             /* Rounded button for Cute mode */
             ${isCute ? 'rounded-xl' : 'rounded-none'}
           `}
         >
           <RotateCcw size={14} />
           System Reset
         </button>
      </div>
    </div>
  );
};

export default SettingsSidebar;