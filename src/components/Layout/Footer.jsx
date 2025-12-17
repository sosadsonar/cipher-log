import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = ({ themeStyles, settings }) => {
  const { t } = useTranslation();

  return (
    <footer className={`
      border-t py-8 text-center text-[10px] uppercase tracking-[0.2em] transition-colors
      ${themeStyles.borderSecondary} ${themeStyles.textMuted}
    `}>
      <div>
        {settings.themeMode === 'cute' ? t('footer.cuddle_time') : t('footer.uptime')}
      </div>
      <div className="mt-2">
        {settings.themeMode === 'cute' ? t('footer.secrets') : t('footer.no_logs')}
      </div>
    </footer>
  );
};

export default Footer;