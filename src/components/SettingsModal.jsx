import React, { useState } from 'react';
import { Settings, X, Unlock, Lock, Power, Activity, Zap } from 'lucide-react';
import SettingToggle from './SettingToggle';
import SliderControl from './SliderControl';

const SettingsModal = ({ isOpen, onClose, isDark, settings, updateSetting }) => {
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
        relative w-full max-w-md border-2 p-1 shadow-2xl animate-in fade-in zoom-in-95 duration-300
        ${isDark ? 'bg-black border-green-500' : 'bg-white border-slate-800'}
      `}>
        {/* Inner Frame */}
        <div className={`
          h-full p-6 border border-dashed flex flex-col max-h-[90vh] overflow-y-auto
          ${isDark ? 'border-green-800' : 'border-slate-300'}
        `}>
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-inherit">
            <div className="flex items-center gap-2">
              <Settings className="animate-spin-slow" size={20} />
              <h2 className="text-xl font-bold uppercase tracking-widest">Sys_Config</h2>
            </div>
            <button 
              onClick={onClose}
              className={`p-1 hover:bg-red-500 hover:text-white transition-colors ${isDark ? 'text-green-500' : 'text-slate-800'}`}
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4 flex-grow">
            <SettingToggle 
              label="Global Decryption" 
              icon={settings.globalDecrypted ? <Unlock size={18}/> : <Lock size={18}/>}
              isOn={settings.globalDecrypted}
              onClick={() => updateSetting('globalDecrypted', !settings.globalDecrypted)}
              onHover={() => setDescription("Decrypts all data blocks globally. Bypasses individual firewall layers for instant readability.")}
              isDark={isDark}
            />
            
            <SettingToggle 
              label="Boot Sequence" 
              icon={<Power size={18}/>}
              isOn={settings.animationsOn}
              onClick={() => updateSetting('animationsOn', !settings.animationsOn)}
              onHover={() => setDescription("Enables 'Terminal Handshake' animation when accessing new nodes.")}
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

          {/* Status Line / Description Area */}
          <div className={`
            mt-8 p-4 min-h-[5rem] text-xs font-mono border-t border-inherit
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