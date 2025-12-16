import React from 'react';
import HackerBackground from './HackerBackground';
import CuteBackground from './CuteBackground';

const BackgroundEffects = ({ themeMode, isDark, settings }) => {
  if (themeMode === 'hacker') {
    return <HackerBackground isDark={isDark} />;
  }

  if (themeMode === 'cute') {
    return <CuteBackground isDark={isDark} settings={settings} />;
  }

  // Normal mode usually has no background effects
  return null;
};

export default BackgroundEffects;