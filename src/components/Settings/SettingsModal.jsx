import React, { useState } from 'react';
import { Settings, X, Palette, Monitor, Type, RotateCcw, Flower2, Sliders } from 'lucide-react';
import DaisyIcon from './DaisyIcon';
import ThemeSettings from './ThemeSettings';
import VisualSettings from './VisualSettings';
import CuteSettings from './CuteSettings';
import FontSelector from './FontSelector';
import { getThemeStyles } from '../../themes';

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
                <ThemeSettings 
                  settings={settings} 
                  updateSetting={updateSetting} 
                  isDark={isDark} 
                  themeStyles={themeStyles} 
                  setDescription={setDescription} 
                />
              )}

              {activeCategory === 'visual' && (
                <>
                  {settings.themeMode === 'hacker' && (
                    <VisualSettings settings={settings} updateSetting={updateSetting} isDark={isDark} themeStyles={themeStyles} setDescription={setDescription} />
                  )}
                  {settings.themeMode === 'cute' && (
                    <CuteSettings settings={settings} updateSetting={updateSetting} isDark={isDark} themeStyles={themeStyles} setDescription={setDescription} />
                  )}
                  {settings.themeMode === 'normal' && (
                    <div className={`text-center p-8 border border-dashed opacity-50 ${themeStyles.borderSecondary} ${themeStyles.textMuted} animate-in fade-in slide-in-from-right-4 duration-300`}>
                      <p className="text-sm">Visual FX are disabled in Normal mode.</p>
                    </div>
                  )}
                </>
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
                    themeStyles={themeStyles} // PASSED HERE
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

          {/* Status Footer */}
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