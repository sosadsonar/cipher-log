import React from 'react';
import { Unlock, Lock, Power, Activity, Zap } from 'lucide-react';
import SettingToggle from './SettingToggle';
import SliderControl from './SliderControl';

const VisualSettings = ({ settings, updateSetting, isDark, themeStyles, setDescription }) => {
  // If not hacker mode, show disabled message
  if (settings.themeMode !== 'hacker') {
    return (
      <div className={`text-center p-8 border border-dashed opacity-50 ${themeStyles.borderSecondary} ${themeStyles.textMuted} animate-in fade-in slide-in-from-right-4 duration-300`}>
        <p className="text-sm">Visual FX are disabled in {settings.themeMode} mode.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
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
    </div>
  );
};

export default VisualSettings;