import React from 'react';
import { Search, Type, ChevronDown, Check } from 'lucide-react';

const FontDropdown = ({ 
  isOpen, 
  setIsOpen, 
  search, 
  setSearch, 
  dropdownRef, 
  filteredFonts, 
  selectedFontName, 
  onSelectFont, 
  styles 
}) => {
  const { borderClass, hoverBorderClass, roundedClass, bgClass, textClass, dropdownBg } = styles;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Area */}
      <div
        className={`
          w-full flex items-center justify-between p-3 border text-sm font-bold transition-all duration-300
          ${borderClass} ${isOpen ? hoverBorderClass : ''} ${roundedClass} ${bgClass} ${textClass}
        `}
      >
        {isOpen ? (
           <div className="flex items-center gap-3 w-full">
             <Search size={14} className="opacity-50 flex-shrink-0" />
             <input 
                type="text" 
                placeholder="Search fonts..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full bg-transparent border-none focus:outline-none text-sm font-bold placeholder-current/50 ${textClass}`}
                autoFocus
             />
           </div>
        ) : (
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 w-full text-left focus:outline-none"
          >
            <Type size={14} />
            <span>{selectedFontName}</span>
          </button>
        )}

        <button 
          onClick={() => {
            setIsOpen(!isOpen);
            if (isOpen) setSearch(""); 
          }}
          className="ml-2 focus:outline-none"
        >
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}/>
        </button>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className={`
          absolute top-full left-0 right-0 mt-2 z-50 border shadow-xl
          max-h-60 overflow-y-auto
          animate-in fade-in zoom-in-95 duration-200
          ${borderClass} ${roundedClass} ${dropdownBg} 
          font-selector-dropdown 
        `}>
          {filteredFonts.length > 0 ? (
            filteredFonts.map((font) => (
              <button
                key={font.name}
                onClick={() => {
                  onSelectFont(font.name);
                  setIsOpen(false);
                  setSearch("");
                }}
                className={`
                  w-full text-left px-4 py-3 text-xs flex items-center justify-between group
                  transition-colors duration-150 hover:bg-current/10 ${textClass}
                  ${selectedFontName === font.name ? 'bg-current/5 font-bold' : ''}
                `}
              >
                <span style={{ fontFamily: font.family.split(',')[0] }}>{font.name}</span>
                {selectedFontName === font.name && <Check size={12} />}
              </button>
            ))
          ) : (
            <div className={`p-4 text-center text-xs opacity-50 ${textClass}`}>No fonts found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FontDropdown;