import React from 'react';
import { Search, Check } from 'lucide-react';

const LanguageDropdown = ({ 
  styles, 
  search, 
  setSearch, 
  filteredLangs, 
  currentLangCode, 
  onSelect,
  themeStyles 
}) => {
  
  return (
    <div className={`
      absolute top-full right-0 mt-2 w-48 z-[60] overflow-hidden
      animate-in fade-in zoom-in-95 duration-200 origin-top-right
      ${styles.dropdown}
    `}>
      
      {/* SEARCH BAR */}
      <div className="p-2 border-b border-inherit">
        <div className="relative flex items-center">
          <Search size={12} className={`absolute left-2.5 opacity-50 ${styles.searchIcon}`} />
          <input 
            type="text" 
            placeholder="Search..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full text-xs pl-8 focus:outline-none ${styles.input}`}
            autoFocus
          />
        </div>
      </div>

      {/* LIST */}
      <div className="max-h-48 overflow-y-auto">
        {filteredLangs.length > 0 ? (
          filteredLangs.map(lang => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className={`
                w-full flex items-center justify-between px-3 py-2 text-xs transition-colors
                ${styles.getItemClass(currentLangCode === lang.code)}
              `}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={`https://flagcdn.com/w20/${lang.country}.png`} 
                  alt={lang.code}
                  className="w-5 h-auto rounded-sm shadow-sm"
                />
                <span>{lang.name}</span>
              </div>
              {currentLangCode === lang.code && <Check size={12} />}
            </button>
          ))
        ) : (
          <div className={`p-3 text-center text-[10px] opacity-50 ${themeStyles.textMuted}`}>
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageDropdown;