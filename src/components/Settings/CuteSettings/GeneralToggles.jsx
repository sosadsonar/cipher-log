import React from 'react';
import { Play, PartyPopper, Sparkles } from 'lucide-react';
import SettingToggle from '../Shared/SettingToggle'; // Updated Path
import SliderControl from '../Shared/SliderControl'; // Updated Path

const GeneralToggles = ({ settings, updateSetting, isDark, themeStyles, setDescription }) => {
  return (
    <>
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

      <SettingToggle 
        label="Confetti Burst" 
        icon={<PartyPopper size={18}/>}
        isOn={settings.cuteConfettiOn}
        onClick={() => updateSetting('cuteConfettiOn', !settings.cuteConfettiOn)}
        onHover={() => setDescription("Pop confetti when hovering over cards.")}
        isDark={isDark}
        themeStyles={themeStyles}
      />

      <SettingToggle 
        label="Ambiance Effects" 
        icon={<Sparkles size={18}/>}
        isOn={settings.cuteEffectsOn}
        onClick={() => updateSetting('cuteEffectsOn', !settings.cuteEffectsOn)}
        onHover={() => setDescription("Toggle floating background particles.")}
        isDark={isDark}
        themeStyles={themeStyles}
      />
    </>
  );
};

export default GeneralToggles;