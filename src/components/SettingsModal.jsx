import React, { useState } from 'react';
import { Settings, X, Unlock, Lock, Power, Activity, Zap, Type, Monitor, RotateCcw } from 'lucide-react';
import SettingToggle from './SettingToggle';
import SliderControl from './SliderControl';
import FontSelector from './FontSelector';

const CATEGORIES = [
  { id: 'visual', label: 'Visual FX', icon: <Monitor size={14} /> },
  { id: 'typography', label: 'Typography', icon: <Type size={14} /> },
];

const SettingsModal = ({ isOpen, onClose, isDark, settings, updateSetting, resetSettings }) => {
  const [activeCategory, setActiveCategory] = useState('visual');
  const [description, setDescription] = useState("Hover over an option to analyze functionality.");

  if (!isOpen) return null;

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
        ${isDark ? 'bg-black border-green-500' : 'bg-white border-slate-800'}
      `} style={{ height: '600px', maxHeight: '90vh' }}>
        
        {/* Inner Frame */}
        <div className={`
          flex-grow p-0 border border-dashed flex flex-col overflow-hidden
          ${isDark ? 'border-green-800' : 'border-slate-300'}
        `}>
          
          {/* Header */}
          <div className={`flex justify-between items-center p-4 md:p-6 border-b ${isDark ? 'border-green-800' : 'border-slate-300'}`}>
            <div className="flex items-center gap-2">
              <Settings className="animate-spin-slow" size={20} />
              <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest">Sys_Config</h2>
            </div>
            <button 
              onClick={onClose}
              className={`p-1 hover:bg-red-500 hover:text-white transition-colors ${isDark ? 'text-green-500' : 'text-slate-800'}`}
            >
              <X size={24} />
            </button>
          </div>

          {/* RESPONSIVE LAYOUT: Flex Column on Mobile, Row on Desktop */}
          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            
            {/* Sidebar / Tabs */}
            <div className={`
              w-full md:w-32 flex-shrink-0 flex flex-row md:flex-col 
              border-b md:border-b-0 md:border-r 
              ${isDark ? 'border-green-800 bg-green-900/5' : 'border-slate-300 bg-slate-50'}
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
                        ? (isDark ? 'bg-green-500 text-black' : 'bg-slate-800 text-white') 
                        : (isDark ? 'text-green-600 hover:bg-green-900/20' : 'text-slate-500 hover:bg-slate-200')}
                    `}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Reset Button (Hidden on tiny mobile screens in sidebar, could move to bottom) */}
              <div className={`
                hidden md:block p-4 border-t ${isDark ? 'border-green-800' : 'border-slate-300'}
              `}>
                 <button
                   onClick={resetSettings}
                   onMouseEnter={() => setDescription("WARNING: Resets all system configurations to factory defaults.")}
                   className={`
                     w-full flex flex-col items-center gap-2 text-[10px] uppercase font-bold py-3 border transition-all duration-300
                     ${isDark 
                        ? 'border-red-900 text-red-500 hover:bg-red-900/30 hover:border-red-500' 
                        : 'border-red-300 text-red-600 hover:bg-red-50 hover:border-red-500'}
                   `}
                 >
                   <RotateCcw size={14} />
                   System Reset
                 </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
              
              {activeCategory === 'visual' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <SettingToggle 
                    label="Global Decryption" 
                    icon={settings.globalDecrypted ? <Unlock size={18}/> : <Lock size={18}/>}
                    isOn={settings.globalDecrypted}
                    onClick={() => updateSetting('globalDecrypted', !settings.globalDecrypted)}
                    onHover={() => setDescription("Decrypts all data blocks globally.")}
                    isDark={isDark}
                  />
                  
                  <SettingToggle 
                    label="Boot Sequence" 
                    icon={<Power size={18}/>}
                    isOn={settings.animationsOn}
                    onClick={() => updateSetting('animationsOn', !settings.animationsOn)}
                    onHover={() => setDescription("Enables 'Terminal Handshake' animation.")}
                    isDark={isDark}
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
                    onHover={() => setDescription("Simulates unstable connection with intermittent display flickering (passive effect).")}
                    isDark={isDark}
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
                  >
                    <SliderControl 
                      label="Decryption Time"
                      value={settings.hoverDuration}
                      min={0.1} max={2.0} step={0.1}
                      onChange={(val) => updateSetting('hoverDuration', val)}
                      isDark={isDark}
                    />
                  </SettingToggle>
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
                  />
                </div>
              )}

              {/* Mobile Only Reset Button (at bottom of content) */}
              <div className="md:hidden pt-8 border-t border-dashed border-gray-700/50">
                 <button
                   onClick={resetSettings}
                   className={`
                     w-full flex items-center justify-center gap-2 text-xs uppercase font-bold py-3 border transition-all
                     ${isDark 
                        ? 'border-red-900 text-red-500 hover:bg-red-900/30' 
                        : 'border-red-300 text-red-600 hover:bg-red-50'}
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
            ${isDark ? 'bg-green-900/10 text-green-400' : 'bg-slate-100 text-slate-600'}
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