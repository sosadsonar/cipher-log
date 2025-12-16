import React from 'react';
import SystemStatus from './SystemStatus';
import HeroTitle from './HeroTitle';
import IntroText from './IntroText';

const Hero = ({ 
  themeStyles, 
  settings, 
  isDark, 
  systemInfo, 
  isSettingsOpen 
}) => {
  return (
    <div className="mb-16 text-center space-y-4">
       
       <SystemStatus 
         systemInfo={systemInfo} 
         isDark={isDark} 
         themeStyles={themeStyles} 
       />

       <HeroTitle 
         themeMode={settings.themeMode} 
         themeStyles={themeStyles} 
         isDark={isDark} 
       />

       <IntroText 
         settings={settings} 
         isSettingsOpen={isSettingsOpen} 
       />

    </div>
  );
};

export default Hero;