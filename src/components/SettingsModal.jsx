import React, { useState } from 'react';
import { Settings, X, Unlock, Lock, Power, Activity, Zap, Type, Monitor, RotateCcw, Palette, Terminal, Heart, FileText, Sliders } from 'lucide-react';
import SettingToggle from './SettingToggle';
import SliderControl from './SliderControl';
import FontSelector from './FontSelector';
import DaisyIcon from './DaisyIcon'; // Imported here
import { getThemeStyles } from '../themes';

const CATEGORIES = [
  { id: 'theme', label: 'Theme', icon: <Palette size={14} /> },
  { id: 'visual', label: 'Visual FX', icon: <Monitor size={14} /> },
  { id: 'typography', label: 'Typography', icon: <Type size={14} /> },
];

const SettingsModal = ({ isOpen, onClose, isDark, settings, updateSetting, resetSettings }) => {
  const [activeCategory, setActiveCategory] = useState('theme');
  const [description, setDescription] = useState("Hover over an option to analyze functionality.");

  // 1. Get the current theme styles
  const themeStyles = getThemeStyles(settings.themeMode, isDark);

  if (!isOpen) return null;

  // 2. Determine Header Icon & Title based on Theme
  const getHeaderDetails = () => {
    switch (settings.themeMode) {
      case 'cute':
        return { 
          // Uses imported DaisyIcon
          icon: <DaisyIcon size={20} />, 
          title: 'PREFERENCES' 
        };
      case 'normal':
        return { 
          icon: <Sliders size={20} />, 
          title: 'SETTINGS' 
        };
      default: // hacker
        return { 
          icon: <Settings className="animate-spin-slow" size={20} />, 
          title: 'SYS_CONFIG' 
        };
    }
  };

  const headerDetails = getHeaderDetails();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Window */}
      <div className={`
        relative w-full max-w-lg border-2 p-1 shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col
        ${themeStyles.modalBg} ${themeStyles.borderPrimary}
      `} style={{ height: '600px', maxHeight: '90vh' }}>
        
        <div className={`
          flex-grow p-0 border border-dashed flex flex-col overflow-hidden
          ${themeStyles.borderSecondary}
        `}>
          
          {/* THEMED HEADER */}
          <div className={`flex justify-between items-center p-4 md:p-6 border-b ${themeStyles.borderSecondary}`}>
            <div className={`flex items-center gap-2 ${themeStyles.textSecondary}`}>
              {headerDetails.icon}
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest">{headerDetails.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className={`p-1 hover:opacity-70 transition-opacity ${themeStyles.textMuted}`}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            
            {/* Sidebar */}
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
                   `}
                 >
                   <RotateCcw size={14} />
                   System Reset
                 </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
              
              {activeCategory === 'theme' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <p className={`text-xs uppercase tracking-widest mb-4 opacity-70 ${themeStyles.textPrimary}`}>Select Interface Protocol</p>
                  
                  {/* Theme Buttons */}
                  <button
                    onClick={() => updateSetting('themeMode', 'hacker')}
                    onMouseEnter={() => setDescription("Standard Interface. High security visuals, encryption active.")}
                    className={`w-full p-4 border rounded-sm flex items-center gap-4 transition-all ${settings.themeMode === 'hacker' ? (isDark ? 'bg-green-900/30 border-green-500' : 'bg-slate-200 border-slate-500') : (isDark ? 'border-green-900 hover:bg-green-900/10' : 'border-slate-300 hover:bg-slate-100')}`}
                  >
                    <Terminal size={24} className={isDark ? 'text-green-500' : 'text-slate-800'} />
                    <div className="text-left">
                      <div className={`font-bold uppercase tracking-widest ${isDark ? 'text-green-400' : 'text-slate-900'}`}>Hacker (Default)</div>
                      <div className={`text-[10px] ${isDark ? 'text-green-600' : 'text-slate-500'}`}>CRT scanlines, flicker, FPE encryption</div>
                    </div>
                  </button>

                  <button
                    onClick={() => updateSetting('themeMode', 'cute')}
                    onMouseEnter={() => setDescription("Kawaii Mode. Soft colors, rounded interface, zero aggression.")}
                    className={`w-full p-4 border rounded-3xl flex items-center gap-4 transition-all ${settings.themeMode === 'cute' ? (isDark ? 'bg-pink-900/30 border-pink-400' : 'bg-rose-100 border-rose-400') : (isDark ? 'border-pink-900 hover:bg-pink-900/10' : 'border-rose-200 hover:bg-rose-50')}`}
                  >
                    <Heart size={24} className={isDark ? 'text-pink-400' : 'text-rose-500'} />
                    <div className="text-left">
                      <div className={`font-bold tracking-wide ${isDark ? 'text-pink-300' : 'text-rose-600'}`}>Cute Mode</div>
                      <div className={`text-[10px] ${isDark ? 'text-pink-500' : 'text-rose-400'}`}>Pastel colors, rounded corners, no glitches</div>
                    </div>
                  </button>

                  <button
                    onClick={() => updateSetting('themeMode', 'normal')}
                    onMouseEnter={() => setDescription("Standard Blog. Minimalist, clean, legible.")}
                    className={`w-full p-4 border rounded-lg flex items-center gap-4 transition-all ${settings.themeMode === 'normal' ? (isDark ? 'bg-gray-700 border-blue-500' : 'bg-gray-100 border-blue-600') : (isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50')}`}
                  >
                    <FileText size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                    <div className="text-left">
                      <div className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Normal Mode</div>
                      <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clean layout, standard fonts, no effects</div>
                    </div>
                  </button>
                </div>
              )}

              {activeCategory === 'visual' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  {settings.themeMode === 'hacker' ? (
                    <>
                      <SettingToggle 
                        label="Global Decryption" 
                        icon={settings.globalDecrypted ? <Unlock size={18}/> : <Lock size={18}/>}
                        isOn={settings.globalDecrypted}
                        onClick={() => updateSetting('globalDecrypted', !settings.globalDecrypted)}
                        onHover={() => setDescription("Decrypts all data blocks globally.")}
                        isDark={isDark}
                        themeStyles={themeStyles}
                      />
                      
                      <SettingToggle 
                        label="Boot Sequence" 
                        icon={<Power size={18}/>}
                        isOn={settings.animationsOn}
                        onClick={() => updateSetting('animationsOn', !settings.animationsOn)}
                        onHover={() => setDescription("Enables 'Terminal Handshake' animation.")}
                        isDark={isDark}
                        themeStyles={themeStyles}
                      >
                        <SliderControl 
                          label="Sequence Duration"
                          value={settings.bootDuration}
                          min={1.0} max={10.0} step={0.5}
                          onChange={(val) => updateSetting('bootDuration', val)}
                          isDark={isDark}
                        />
                      </SettingToggle>

                      <SettingToggle 
                        label="Signal Noise" 
                        icon={<Activity size={18}/>}
                        isOn={settings.flickerOn}
                        onClick={() => updateSetting('flickerOn', !settings.flickerOn)}
                        onHover={() => setDescription("Simulates unstable connection with intermittent display flickering.")}
                        isDark={isDark}
                        themeStyles={themeStyles}
                      >
                        <SliderControl 
                          label="Flicker Frequency"
                          value={settings.flickerDuration}
                          min={2.0} max={15.0} step={0.5}
                          onChange={(val) => updateSetting('flickerDuration', val)}
                          isDark={isDark}
                        />
                      </SettingToggle>

                      <SettingToggle 
                        label="Hover Feedback" 
                        icon={<Zap size={18}/>}
                        isOn={settings.hoverGlitchOn}
                        onClick={() => updateSetting('hoverGlitchOn', !settings.hoverGlitchOn)}
                        onHover={() => setDescription("Controls the intense glitch animation when hovering over data blocks.")}
                        isDark={isDark}
                        themeStyles={themeStyles}
                      >
                        <SliderControl 
                          label="Decryption Time"
                          value={settings.hoverDuration}
                          min={0.1} max={2.0} step={0.1}
                          onChange={(val) => updateSetting('hoverDuration', val)}
                          isDark={isDark}
                        />
                      </SettingToggle>
                    </>
                  ) : (
                    <div className={`text-center p-8 border border-dashed opacity-50 ${themeStyles.borderSecondary} ${themeStyles.textMuted}`}>
                      <p className="text-sm">Visual FX are disabled in {settings.themeMode} mode.</p>
                    </div>
                  )}
                </div>
              )}

              {activeCategory === 'typography' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <FontSelector 
                    selectedFontName={settings.fontFamily}
                    onSelectFont={(name) => updateSetting('fontFamily', name)}
                    customFontOn={settings.customFontOn}
                    onToggleCustom={() => updateSetting('customFontOn', !settings.customFontOn)}
                    customFontUrl={settings.customFontUrl}
                    onUpdateCustomUrl={(val) => updateSetting('customFontUrl', val)}
                    customFontFamily={settings.customFontFamily}
                    onUpdateCustomFamily={(val) => updateSetting('customFontFamily', val)}
                    isDark={isDark}
                    // Pass themeStyles to FontSelector if you update FontSelector to use it, 
                    // otherwise it falls back to hardcoded green/slate inside FontSelector.
                  />
                </div>
              )}

              <div className={`md:hidden pt-8 border-t border-dashed border-gray-700/50`}>
                 <button
                   onClick={resetSettings}
                   className={`
                     w-full flex items-center justify-center gap-2 text-xs uppercase font-bold py-3 border transition-all
                     ${isDark ? 'border-red-900 text-red-500 hover:bg-red-900/30' : 'border-red-300 text-red-600 hover:bg-red-50'}
                   `}
                 >
                   <RotateCcw size={14} />
                   System Reset
                 </button>
              </div>

            </div>
          </div>

          {/* Status Line */}
          <div className={`
            p-3 md:p-4 min-h-[3rem] md:min-h-[4rem] text-[10px] md:text-xs font-mono border-t border-inherit flex-shrink-0
            ${isDark ? 'bg-white/5' : 'bg-black/5'} ${themeStyles.textMuted}
          `}>
             <span className="opacity-50 mr-2">{`>`}</span>
             <span className="typewriter-cursor">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;