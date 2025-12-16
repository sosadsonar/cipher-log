import React, { useState, useRef, useEffect } from 'react';
import { Search, Type, ChevronDown, Check, Link, Download } from 'lucide-react';
import { AVAILABLE_FONTS } from '../../data';
import SettingToggle from './SettingToggle';

const FontSelector = ({ 
  selectedFontName, 
  onSelectFont, 
  customFontOn, 
  onToggleCustom, 
  customFontUrl, 
  onUpdateCustomUrl, 
  onUpdateCustomFamily, 
  isDark,
  themeStyles 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [tempUrl, setTempUrl] = useState(customFontUrl); 
  const dropdownRef = useRef(null);

  useEffect(() => {
    setTempUrl(customFontUrl);
  }, [customFontUrl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch(""); // Reset search when closing
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImport = () => {
    if (!tempUrl) return;
    onUpdateCustomUrl(tempUrl);
    try {
      const urlObj = new URL(tempUrl);
      const familyParam = urlObj.searchParams.get("family");
      if (familyParam) {
        const familyName = familyParam.split(':')[0].replace(/\+/g, ' ');
        onUpdateCustomFamily(familyName);
      }
    } catch (e) {
      console.error("Could not parse font URL", e);
    }
  };

  const filteredFonts = AVAILABLE_FONTS.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const borderClass = themeStyles ? themeStyles.borderSecondary : (isDark ? 'border-green-800' : 'border-slate-300');
  const hoverBorderClass = themeStyles ? themeStyles.borderPrimary : (isDark ? 'border-green-500' : 'border-slate-500');
  const textClass = themeStyles ? themeStyles.textPrimary : (isDark ? 'text-green-400' : 'text-slate-800');
  const roundedClass = themeStyles ? themeStyles.roundedBtn : 'rounded-sm';
  const bgClass = isDark ? 'bg-white/5' : 'bg-black/5';
  // Use theme modal background if available, otherwise fallback
  const dropdownBg = themeStyles ? themeStyles.modalBg : (isDark ? 'bg-black' : 'bg-white');

  return (
    <div className="space-y-4">
      <div className={`
        relative 
        ${customFontOn ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'} 
        transition-all duration-300
      `}>
        <label className={`text-[10px] uppercase tracking-widest mb-2 block ${textClass} opacity-70`}>
          Primary System Font
        </label>
        
        <div ref={dropdownRef} className="relative">
          {/* Integrated Button/Search Container */}
          <div
            className={`
              w-full flex items-center justify-between p-3 border text-sm font-bold transition-all duration-300
              ${borderClass} ${isOpen ? hoverBorderClass : ''} ${roundedClass} ${bgClass}
              ${textClass}
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
                    className={`
                      w-full bg-transparent border-none focus:outline-none text-sm font-bold placeholder-current/50
                      ${textClass}
                    `}
                    autoFocus
                    onClick={(e) => e.stopPropagation()} 
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

          {isOpen && (
            <div className={`
              absolute top-full left-0 right-0 mt-2 z-50 border shadow-xl
              /* SCROLLBAR LOGIC */
              max-h-60 overflow-y-auto
              animate-in fade-in zoom-in-95 duration-200
              ${borderClass} ${roundedClass}
              ${dropdownBg} 
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
                      transition-colors duration-150
                      hover:bg-current/10 
                      ${textClass}
                      ${selectedFontName === font.name ? 'bg-current/5 font-bold' : ''}
                    `}
                  >
                    <span style={{ fontFamily: font.family.split(',')[0] }}>{font.name}</span>
                    {selectedFontName === font.name && <Check size={12} />}
                  </button>
                ))
              ) : (
                <div className={`p-4 text-center text-xs opacity-50 ${textClass}`}>
                  No fonts found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <SettingToggle 
        label="Custom Override" 
        icon={<Link size={18}/>}
        isOn={customFontOn}
        onClick={onToggleCustom}
        onHover={() => {}}
        isDark={isDark}
        themeStyles={themeStyles}
      >
        <div className={`
          mt-3 pt-3 border-t border-dashed
          ${borderClass}
          animate-in slide-in-from-top-2 duration-300
        `}>
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
      </SettingToggle>

    </div>
  );
};

export default FontSelector;