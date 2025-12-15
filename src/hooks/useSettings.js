import { useState } from 'react';
import { getThemeStyles } from '../themes';
import { AVAILABLE_FONTS } from '../data';

const DEFAULT_SETTINGS = {
  // Hacker Settings
  globalDecrypted: false,
  animationsOn: true,
  bootDuration: 3.5,
  flickerOn: true,
  flickerDuration: 7.0,
  hoverGlitchOn: true,
  hoverDuration: 0.5,
  
  // Shared Typography
  fontFamily: 'Space Mono',
  customFontOn: false,
  customFontUrl: '',
  customFontFamily: '',
  themeMode: 'hacker',

  // Cute Settings
  cuteEffectsOn: true,
  cuteEffectSpeed: 1.0, 
  cuteParticleType: 'petals',
  cuteParticleDensity: 20, 
  cuteDustSize: 5
};

export const useSettings = (isDark) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const updateSetting = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      
      // Auto-switch font when theme changes
      if (key === 'themeMode') {
        if (value === 'cute') newSettings.fontFamily = 'Quicksand (Cute)';
        else if (value === 'normal') newSettings.fontFamily = 'Inter (Normal)';
        else if (value === 'hacker') newSettings.fontFamily = 'Space Mono';
      }
      return newSettings;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Compute derived state
  const themeStyles = getThemeStyles(settings.themeMode, isDark);
  
  const getActiveFontFamily = () => {
    if (settings.customFontOn && settings.customFontFamily) {
      return settings.customFontFamily;
    }
    const fontData = AVAILABLE_FONTS.find(f => f.name === settings.fontFamily);
    return fontData ? fontData.family : 'monospace';
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    themeStyles,
    activeFontFamily: getActiveFontFamily()
  };
};