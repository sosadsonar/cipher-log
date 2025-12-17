import React from 'react';
import { Activity, Layers, Maximize2 } from 'lucide-react';
import SliderControl from '../Shared/SliderControl';
import { useTranslation } from 'react-i18next';

const EffectSliders = ({ settings, updateSetting, isDark, themeStyles, cuteTextColor, particleLabel }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={`w-full p-0 border-none transition-all duration-300 ${cuteTextColor}`}>
        <SliderControl 
          label={t('settings.cute_speed')}
          icon={<Activity size={14} />}
          value={settings.cuteEffectSpeed}
          min={0.1} max={3.0} step={0.1}
          unit="x"
          onChange={(val) => updateSetting('cuteEffectSpeed', val)}
          isDark={isDark}
          themeStyles={themeStyles}
        />
      </div>

      <div className={`w-full p-0 border-none transition-all duration-300 ${cuteTextColor}`}>
        <SliderControl 
          label={t('settings.cute_density')}
          icon={<Layers size={14} />}
          value={settings.cuteParticleDensity || 20}
          min={5} max={50} step={5}
          unit=""
          onChange={(val) => updateSetting('cuteParticleDensity', val)}
          isDark={isDark}
          themeStyles={themeStyles}
        />
      </div>

      <div className={`w-full p-0 border-none transition-all duration-300 ${cuteTextColor}`}>
        <SliderControl 
          label={t('settings.cute_size')}
          icon={<Maximize2 size={14} />}
          value={settings.cuteDustSize || 5} 
          min={1} max={10} step={1}
          unit="px"
          onChange={(val) => updateSetting('cuteDustSize', val)}
          isDark={isDark}
          themeStyles={themeStyles}
        />
      </div>
    </>
  );
};

export default EffectSliders;