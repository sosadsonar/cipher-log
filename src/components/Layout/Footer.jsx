import React from 'react';

const Footer = ({ themeStyles, settings }) => {
  return (
    <footer className={`
      border-t py-8 text-center text-[10px] uppercase tracking-[0.2em] transition-colors
      ${themeStyles.borderSecondary} ${themeStyles.textMuted}
    `}>
      <div>
        {settings.themeMode === 'cute' ? 'Cuddle Timer: 100%' : 'System Uptime: 99.9%'}
      </div>
      <div className="mt-2">
        {settings.themeMode === 'cute' ? 'all secrets spilled' : 'No logs preserved'}
      </div>
    </footer>
  );
};

export default Footer;