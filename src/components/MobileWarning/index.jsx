import React from 'react';
import HackerMobileWarning from '../Hacker/MobileWarning';
import CuteMobileWarning from '../Cute/MobileWarning';

const MobileWarning = ({ onClose, isDark, themeMode }) => {
  
  if (themeMode === 'cute') {
    return <CuteMobileWarning onClose={onClose} isDark={isDark} />;
  }

  return <HackerMobileWarning onClose={onClose} isDark={isDark} />;
};

export default MobileWarning;