import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Activity, Power, Search, Check, ChevronDown, Layers, Minimize2, Maximize2, Play } from 'lucide-react';
import SettingToggle from './SettingToggle';
import SliderControl from './SliderControl';

const PARTICLE_TYPES = [
  { id: 'petals', label: 'Sakura Petals', icon: '🌸' },
  { id: 'stars', label: 'Starlight', icon: '✨' },
  { id: 'snow', label: 'Soft Snow', icon: '❄️' },
  { id: 'dust', label: 'Fairy Dust', icon: '🫧' },
];

const CuteSettings = ({ settings, updateSetting, isDark, themeStyles, setDescription }) => {
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

  const filteredParticles = PARTICLE_TYPES.filter(p => 
    p.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedParticle = PARTICLE_TYPES.find(p => p.id === settings.cuteParticleType) || PARTICLE_TYPES[0];

  if (settings.themeMode !== 'cute') {
    return (
      <div className={`text-center p-8 border border-dashed opacity-50 ${themeStyles.borderSecondary} ${themeStyles.textMuted} animate-in fade-in slide-in-from-right-4 duration-300`}>
        <p className="text-sm">Cute FX are disabled in {settings.themeMode} mode.</p>
      </div>
    );
  }

  // Force pink color class for Cute settings specifically to ensure sliders match
  const cuteTextColor = isDark ? 'text-pink-300' : 'text-rose-500';

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* 1. Boot Sequence Toggle WITH Slider (New) */}
      <SettingToggle 
        label="Intro Animation" 
        icon={<Play size={18}/>}
        isOn={settings.animationsOn}
        onClick={() => updateSetting('animationsOn', !settings.animationsOn)}
        onHover={() => setDescription("Play the cute loading sequence when opening posts.")}
        isDark={isDark}
        themeStyles={themeStyles}
      >
        <SliderControl 
          label="Duration"
          value={settings.bootDuration}
          min={1.0} max={10.0} step={0.5}
          onChange={(val) => updateSetting('bootDuration', val)}
          isDark={isDark}
          themeStyles={themeStyles}
        />
      </SettingToggle>

      {/* 2. Master FX Toggle */}
      <SettingToggle 
        label="Ambiance Effects" 
        icon={<Power size={18}/>}
        isOn={settings.cuteEffectsOn}
        onClick={() => updateSetting('cuteEffectsOn', !settings.cuteEffectsOn)}
        onHover={() => setDescription("Toggle floating background particles.")}
        isDark={isDark}
        themeStyles={themeStyles}
      />

      {settings.cuteEffectsOn && (
        <>
          {/* 3. Particle Type Selector */}
          <div className="relative" ref={dropdownRef}>
            <label className={`text-[10px] uppercase tracking-widest mb-2 block ${themeStyles.textPrimary} opacity-70`}>
              Particle Style
            </label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setDescription("Choose the type of floating particles.")}
              className={`
                w-full flex items-center justify-between p-3 border rounded-3xl text-sm font-bold transition-all duration-300
                ${themeStyles.borderSecondary} hover:${themeStyles.borderPrimary}
                ${isDark ? 'bg-white/5 text-pink-300' : 'bg-white text-rose-600'}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{selectedParticle.icon}</span>
                <span>{selectedParticle.label}</span>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>

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
                      placeholder="Search effects..." 
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
                      {particle.label}
                    </span>
                    {settings.cuteParticleType === particle.id && <Check size={12} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Speed Slider - Direct Control */}
          <div className={`w-full p-0 border-none transition-all duration-300 ${cuteTextColor}`}>
            <SliderControl 
              label="Drift Velocity"
              icon={<Activity size={14} />}
              value={settings.cuteEffectSpeed}
              min={0.1} max={3.0} step={0.1}
              unit="x"
              onChange={(val) => updateSetting('cuteEffectSpeed', val)}
              isDark={isDark}
              themeStyles={themeStyles}
            />
          </div>

          {/* 5. Density Slider - Direct Control */}
          <div className={`w-full p-0 border-none transition-all duration-300 ${cuteTextColor}`}>
            <SliderControl 
              label="Particle Density"
              icon={<Layers size={14} />}
              value={settings.cuteParticleDensity || 20}
              min={5} max={50} step={5}
              unit=""
              onChange={(val) => updateSetting('cuteParticleDensity', val)}
              isDark={isDark}
              themeStyles={themeStyles}
            />
          </div>

          {/* 6. Size Slider - Direct Control */}
          <div className={`w-full p-0 border-none transition-all duration-300 ${cuteTextColor}`}>
            <SliderControl 
              label={`${selectedParticle.label.split(' ')[1] || 'Particle'} Size`}
              icon={<Maximize2 size={14} />}
              value={settings.cuteDustSize || 5} // Updated Fallback to 5
              min={1} max={10} step={1}
              unit="px"
              onChange={(val) => updateSetting('cuteDustSize', val)}
              isDark={isDark}
              themeStyles={themeStyles}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CuteSettings;