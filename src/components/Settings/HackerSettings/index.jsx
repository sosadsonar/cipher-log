import React from 'react';
import { Unlock, Lock, Activity, Zap } from 'lucide-react';
import SettingToggle from '../Shared/SettingToggle';
import SliderControl from '../Shared/SliderControl';
import { useTranslation } from 'react-i18next';

const HackerSettings = ({ settings, updateSetting, isDark, themeStyles, setDescription }) => {
  const { t } = useTranslation();
  if (settings.themeMode !== 'hacker') return null;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      
      <SettingToggle 
        label={t('settings.hacker_global')}
        icon={settings.globalDecrypted ? <Unlock size={18}/> : <Lock size={18}/>}
        isOn={settings.globalDecrypted}
        onClick={() => updateSetting('globalDecrypted', !settings.globalDecrypted)}
        onHover={() => setDescription(t('settings.hover_tip'))}
        isDark={isDark}
        themeStyles={themeStyles}
      />
      
      <SettingToggle 
        label={t('settings.hacker_noise')}
        icon={<Activity size={18}/>}
        isOn={settings.flickerOn}
        onClick={() => updateSetting('flickerOn', !settings.flickerOn)}
        onHover={() => setDescription(t('settings.hover_tip'))}
        isDark={isDark}
        themeStyles={themeStyles}
      >
        <SliderControl 
          label="Flicker Frequency"
          value={settings.flickerDuration}
          min={2.0} max={15.0} step={0.5}
          onChange={(val) => updateSetting('flickerDuration', val)}
          isDark={isDark}
          themeStyles={themeStyles}
        />
      </SettingToggle>

      <SettingToggle 
        label={t('settings.hacker_glitch')}
        icon={<Zap size={18}/>}
        isOn={settings.hoverGlitchOn}
        onClick={() => updateSetting('hoverGlitchOn', !settings.hoverGlitchOn)}
        onHover={() => setDescription(t('settings.hover_tip'))}
        isDark={isDark}
        themeStyles={themeStyles}
      >
        <SliderControl 
          label="Decryption Time"
          value={settings.hoverDuration}
          min={0.1} max={2.0} step={0.1}
          onChange={(val) => updateSetting('hoverDuration', val)}
          isDark={isDark}
          themeStyles={themeStyles}
        />
      </SettingToggle>
    </div>
  );
};

export default HackerSettings;