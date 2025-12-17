import { useState, useEffect } from 'react';
import { getThemeStyles } from '../themes';
import { AVAILABLE_FONTS } from '../fonts';
import { useTranslation } from 'react-i18next';

const DEFAULT_SETTINGS = {
  themeMode: 'hacker',
  language: 'EN', 
  globalDecrypted: false,
  flickerOn: true,
  hoverGlitchOn: true,
  animationsOn: true,
  hoverDuration: 0.3,
  bootDuration: 2.0,
  flickerDuration: 7,
  cuteEffectsOn: true,
  cuteConfettiOn: true,
  cuteParticleType: 'petals',
  cuteEffectSpeed: 1.0,
  cuteParticleDensity: 20,
  cuteDustSize: 5,
  fontFamily: 'System Mono', 
  customFontOn: false,
  customFontUrl: '',
  customFontFamily: '',
};

export const useSettings = (isDark) => {
  // 1. Call Hook at Top Level
  const { i18n } = useTranslation();

  // 2. Initialize State
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('blog_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  });

  // 3. Sync i18n with settings ON MOUNT (Effect, not inline)
  useEffect(() => {
    if (settings.language && i18n.language !== settings.language) {
      i18n.changeLanguage(settings.language);
    }
  }, []); // Run once on mount

  // 4. Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('blog_settings', JSON.stringify(settings));
  }, [settings]);

  // 5. Update Function
  const updateSetting = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      
      // Handle Language Switch
      if (key === 'language') {
        i18n.changeLanguage(value);
      }

      // Handle Theme Font Switch
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
    i18n.changeLanguage(DEFAULT_SETTINGS.language);
  };

  const themeStyles = getThemeStyles(settings.themeMode, isDark);
  
  const getActiveFontFamily = () => {
    if (settings.customFontOn && settings.customFontFamily) {
      return settings.customFontFamily;
    }
    const foundFont = AVAILABLE_FONTS.find(f => f.name === settings.fontFamily);
    return foundFont ? foundFont.family : 'monospace';
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    themeStyles,
    activeFontFamily: getActiveFontFamily()
  };
};