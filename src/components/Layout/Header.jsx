import React from 'react';
import { Hash, Sun, Moon, Settings, Heart, FileText } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Header = ({ 
  themeStyles, 
  isDark, 
  settings, 
  setIsDark, 
  setIsSettingsOpen,
  updateSetting 
}) => {
  const { t } = useTranslation();

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between
      backdrop-blur-md border-b transition-colors duration-500
      ${themeStyles.headerBg} ${themeStyles.borderSecondary}
    `}>
      <div className="flex items-center gap-2 group cursor-default">
        <div className={`p-2 border transition-colors duration-300 ${themeStyles.borderPrimary} ${isDark ? 'bg-white/5' : 'bg-black/5'} ${themeStyles.roundedBtn}`}>
           {settings.themeMode === 'hacker' && <Hash size={20} className="animate-spin-slow" />}
           {settings.themeMode === 'cute' && <Heart size={20} className="animate-bounce" />}
           {settings.themeMode === 'normal' && <FileText size={20} />}
        </div>
        <div>
          <h1 className="text-lg font-bold uppercase tracking-widest leading-none">
            {settings.themeMode === 'cute' ? (
              <>
                {t('header.title_cute_prefix')}
                <span className="animate-pulse inline-block">{t('header.title_cute_pulse')}</span>
              </>
            ) : settings.themeMode === 'hacker' ? (
              <>
                {t('header.title_hacker_prefix')}
                <span className="animate-pulse inline-block">{t('header.title_hacker_pulse')}</span>
              </>
            ) : (
              // Fallback for Normal mode using existing logic or generic text
              <>Zero_Day_Log</>
            )}
          </h1>
          <span className={`text-[10px] uppercase opacity-60`}>
            {settings.themeMode === 'hacker' && t('header.subtitle_hacker')}
            {settings.themeMode === 'cute' && t('header.subtitle_cute')}
            {settings.themeMode === 'normal' && 'Personal Blog V.3.2.0'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* --- LANGUAGE SELECTOR --- */}
        <LanguageSelector 
          settings={settings}
          updateSetting={updateSetting}
          isDark={isDark}
          themeStyles={themeStyles}
        />

        <button 
          onClick={() => setIsDark(!isDark)}
          className={`
            flex items-center gap-2 text-xs uppercase hover:opacity-70 transition-all
            ${themeStyles.textPrimary}
          `}
          title={isDark ? t('header.toggle_light') : t('header.toggle_dark')}
        >
          <span className="hidden md:inline">
            {isDark ? t('header.toggle_light') : t('header.toggle_dark')}
          </span>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button 
          onClick={() => setIsSettingsOpen(true)}
          className={`
            p-2 border transition-all duration-300
            ${themeStyles.borderSecondary} hover:${themeStyles.borderPrimary}
            ${themeStyles.roundedBtn}
          `}
          title="System Configuration"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;