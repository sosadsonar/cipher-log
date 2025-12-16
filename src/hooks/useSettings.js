// FIX: Added 'useEffect' to the import list
import { useState, useEffect } from 'react';
import { getThemeStyles } from '../themes';
import { AVAILABLE_FONTS } from '../fonts';

const DEFAULT_SETTINGS = {
  // Core
  themeMode: 'hacker', // 'hacker', 'cute', 'normal'
  
  // Visuals (Hacker)
  globalDecrypted: false,
  flickerOn: true,
  hoverGlitchOn: true,
  animationsOn: true,
  hoverDuration: 0.3,
  bootDuration: 2.0,
  flickerDuration: 7,

  // Visuals (Cute)
  cuteEffectsOn: true,
  cuteConfettiOn: true,
  cuteParticleType: 'petals',
  cuteEffectSpeed: 1.0,
  cuteParticleDensity: 20,
  cuteDustSize: 5,

  // Typography
  fontFamily: 'System Mono', 
  customFontOn: false,
  customFontUrl: '',
  customFontFamily: '',
};

export const useSettings = (isDark) => {
  // Load from localStorage or use default
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('blog_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('blog_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      
      // Auto-switch font when theme changes (optional UX improvement)
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

  // Derived state
  const themeStyles = getThemeStyles(settings.themeMode, isDark);
  
  // Determine Active Font Family
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