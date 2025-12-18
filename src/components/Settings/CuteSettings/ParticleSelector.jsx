import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { PARTICLE_TYPES } from './constants';
import { useTranslation } from 'react-i18next';

const ParticleSelector = ({ settings, updateSetting, isDark, themeStyles, setDescription }) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Map static types to localized versions
  const localizedParticles = PARTICLE_TYPES.map(p => ({
    ...p,
    translatedLabel: t(`settings.cute_p_${p.id}`) 
  }));

  const filteredParticles = localizedParticles.filter(p => 
    p.translatedLabel.toLowerCase().includes(search.toLowerCase())
  );

  const selectedParticle = localizedParticles.find(p => p.id === settings.cuteParticleType) || localizedParticles[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <label className={`text-[10px] uppercase tracking-widest mb-2 block ${themeStyles.textPrimary} opacity-70`}>
        {t('settings.cute_style')}
      </label>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onMouseEnter={() => setDescription(t('settings.descriptions.particle_style'))} // UPDATED
        className={`
          w-full flex items-center justify-between p-3 border rounded-3xl text-sm font-bold transition-all duration-300
          ${themeStyles.borderSecondary} hover:${themeStyles.borderPrimary}
          ${isDark ? 'bg-white/5 text-pink-300' : 'bg-white text-rose-600'}
        `}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{selectedParticle.icon}</span>
          <span>{selectedParticle.translatedLabel}</span>
        </div>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}/>
      </button>

      {/* ... Dropdown List (Unchanged) ... */}
      {isDropdownOpen && (
        <div className={`
          absolute top-full left-0 right-0 mt-2 z-50 border rounded-xl max-h-48 overflow-y-auto shadow-xl
          animate-in fade-in zoom-in-95 duration-200
          ${isDark ? 'bg-[#3d2434] border-pink-900' : 'bg-white border-rose-200'}
        `}>
          <div className={`sticky top-0 p-2 border-b ${isDark ? 'bg-[#3d2434] border-pink-900' : 'bg-white border-rose-200'}`}>
            <div className="relative">
              <Search size={12} className={`absolute left-3 top-2.5 ${isDark ? 'text-pink-500' : 'text-rose-400'}`} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`
                  w-full pl-8 pr-3 py-1.5 text-xs bg-transparent border rounded-full focus:outline-none
                  ${isDark ? 'border-pink-900 text-pink-300 placeholder:text-pink-700' : 'border-rose-200 text-rose-600 placeholder:text-rose-300'}
                `}
                autoFocus
              />
            </div>
          </div>

          {filteredParticles.map((particle) => (
            <button
              key={particle.id}
              onClick={() => {
                updateSetting('cuteParticleType', particle.id);
                setIsDropdownOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 text-xs flex items-center justify-between group
                ${isDark 
                  ? 'hover:bg-pink-900/30 text-pink-300 hover:text-pink-100' 
                  : 'hover:bg-rose-50 text-rose-600 hover:text-rose-800'}
                ${settings.cuteParticleType === particle.id ? (isDark ? 'bg-pink-900/50' : 'bg-rose-100') : ''}
              `}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{particle.icon}</span>
                {particle.translatedLabel}
              </span>
              {settings.cuteParticleType === particle.id && <Check size={12} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParticleSelector;