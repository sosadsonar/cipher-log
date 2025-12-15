import React, { useState, useRef, useEffect } from 'react';
import { Search, Type, ChevronDown, Check, Link, Edit3 } from 'lucide-react';
import { AVAILABLE_FONTS } from '../data';
import SettingToggle from './SettingToggle';

const FontSelector = ({ 
  selectedFontName, 
  onSelectFont, 
  customFontOn, 
  onToggleCustom, 
  customFontUrl, 
  onUpdateCustomUrl, 
  customFontFamily, 
  onUpdateCustomFamily, 
  isDark 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredFonts = AVAILABLE_FONTS.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* --- STANDARD FONT SELECTION --- */}
      <div className={`
        relative 
        ${customFontOn ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'} 
        transition-all duration-300
      `}>
        <label className={`text-[10px] uppercase tracking-widest mb-2 block ${isDark ? 'text-green-600' : 'text-slate-500'}`}>
          Primary System Font
        </label>
        
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              w-full flex items-center justify-between p-3 border rounded-sm text-sm font-mono
              ${isDark 
                ? 'bg-black border-green-800 text-green-400 hover:border-green-500' 
                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-500'}
            `}
          >
            <div className="flex items-center gap-3">
              <Type size={14} />
              <span>{selectedFontName}</span>
            </div>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}/>
          </button>

          {isOpen && (
            <div className={`
              absolute top-full left-0 right-0 mt-1 z-50 border rounded-sm max-h-60 overflow-y-auto shadow-xl
              animate-in fade-in zoom-in-95 duration-200
              ${isDark ? 'bg-black border-green-600' : 'bg-white border-slate-400'}
            `}>
              <div className={`sticky top-0 p-2 border-b ${isDark ? 'bg-black border-green-900' : 'bg-white border-slate-200'}`}>
                <div className="relative">
                  <Search size={12} className={`absolute left-2 top-2 ${isDark ? 'text-green-700' : 'text-slate-400'}`} />
                  <input 
                    type="text" 
                    placeholder="Search protocols..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`
                      w-full pl-7 pr-2 py-1 text-xs bg-transparent border-none focus:outline-none
                      ${isDark ? 'text-green-400 placeholder:text-green-900' : 'text-slate-800 placeholder:text-slate-400'}
                    `}
                    autoFocus
                  />
                </div>
              </div>

              {filteredFonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => {
                    onSelectFont(font.name);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-2 text-xs flex items-center justify-between group
                    ${isDark 
                      ? 'hover:bg-green-900/30 text-green-500/70 hover:text-green-400' 
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'}
                    ${selectedFontName === font.name ? (isDark ? 'bg-green-900/20 text-green-400' : 'bg-slate-100 text-slate-900') : ''}
                  `}
                >
                  <span style={{ fontFamily: font.family.split(',')[0] }}>{font.name}</span>
                  {selectedFontName === font.name && <Check size={12} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- CUSTOM FONT TOGGLE --- */}
      <SettingToggle 
        label="Custom Override" 
        icon={<Link size={18}/>}
        isOn={customFontOn}
        onClick={onToggleCustom}
        onHover={() => {}}
        isDark={isDark}
      >
        <div className={`
          mt-3 pt-3 space-y-3 border-t border-dashed
          ${isDark ? 'border-green-900/50' : 'border-slate-300'}
          animate-in slide-in-from-top-2 duration-300
        `}>
          {/* Custom URL Input */}
          <div>
            <div className="flex justify-between items-center mb-1 text-[10px] uppercase tracking-widest font-mono opacity-70">
              <span className="flex items-center gap-2"><Link size={10} /> URL (CSS/Google Fonts)</span>
            </div>
            <input 
              type="text" 
              value={customFontUrl}
              onChange={(e) => onUpdateCustomUrl(e.target.value)}
              placeholder="https://fonts.googleapis.com/css2?..."
              className={`
                w-full p-2 text-xs border rounded-sm bg-transparent focus:outline-none
                ${isDark 
                  ? 'border-green-800 focus:border-green-500 text-green-400 placeholder:text-green-900' 
                  : 'border-slate-300 focus:border-slate-500 text-slate-800 placeholder:text-slate-400'}
              `}
            />
          </div>

          {/* Custom Family Input */}
          <div>
            <div className="flex justify-between items-center mb-1 text-[10px] uppercase tracking-widest font-mono opacity-70">
              <span className="flex items-center gap-2"><Edit3 size={10} /> CSS Family Name</span>
            </div>
            <input 
              type="text" 
              value={customFontFamily}
              onChange={(e) => onUpdateCustomFamily(e.target.value)}
              placeholder="e.g. 'Roboto', 'Open Sans'"
              className={`
                w-full p-2 text-xs border rounded-sm bg-transparent focus:outline-none
                ${isDark 
                  ? 'border-green-800 focus:border-green-500 text-green-400 placeholder:text-green-900' 
                  : 'border-slate-300 focus:border-slate-500 text-slate-800 placeholder:text-slate-400'}
              `}
            />
          </div>
        </div>
      </SettingToggle>

    </div>
  );
};

export default FontSelector;