import React from 'react';
import { ChevronDown } from 'lucide-react';

const TriggerButton = ({ isOpen, toggle, selectedLang, themeStyles }) => {
  return (
    <button 
      onClick={toggle}
      className={`
        flex items-center gap-2 px-3 py-2 border transition-all duration-300
        ${themeStyles.borderSecondary} hover:${themeStyles.borderPrimary}
        ${themeStyles.roundedBtn}
        ${themeStyles.textPrimary}
      `}
    >
      <img 
        src={`https://flagcdn.com/w20/${selectedLang.country}.png`} 
        alt={selectedLang.code}
        className="w-5 h-auto rounded-sm object-cover"
      />
      <span className="font-bold text-xs">{selectedLang.code}</span>
      <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

export default TriggerButton;