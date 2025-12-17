import React from 'react';
import { PartyPopper, Sparkles } from 'lucide-react';
import SettingToggle from '../Shared/SettingToggle';
import { useTranslation } from 'react-i18next';

const GeneralToggles = ({ settings, updateSetting, isDark, themeStyles, setDescription }) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingToggle 
        label={t('settings.cute_confetti')}
        icon={<PartyPopper size={18}/>}
        isOn={settings.cuteConfettiOn}
        onClick={() => updateSetting('cuteConfettiOn', !settings.cuteConfettiOn)}
        onHover={() => setDescription(t('settings.hover_tip'))}
        isDark={isDark}
        themeStyles={themeStyles}
      />

      <SettingToggle 
        label={t('settings.cute_ambiance')}
        icon={<Sparkles size={18}/>}
        isOn={settings.cuteEffectsOn}
        onClick={() => updateSetting('cuteEffectsOn', !settings.cuteEffectsOn)}
        onHover={() => setDescription(t('settings.hover_tip'))}
        isDark={isDark}
        themeStyles={themeStyles}
      />
    </>
  );
};

export default GeneralToggles;