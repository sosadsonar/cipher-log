import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroTitle = ({ themeMode, themeStyles, isDark }) => {
  const { t } = useTranslation();
  
  if (themeMode === 'hacker') {
    return (
      <h2 className={`mt-8 text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-4xl mx-auto glitch-hover ${themeStyles.textSecondary}`}>
        {t('hero.hacker_1')} <span className="line-through decoration-red-500">{t('hero.hacker_2')}</span> <br />
        <span className={themeStyles.textSecondary}>{t('hero.hacker_3')}</span>
      </h2>
    );
  } 
  
  if (themeMode === 'cute') {
    return (
      <h2 className={`mt-8 text-4xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto ${themeStyles.textSecondary}`}>
        {t('hero.cute_1')} <br />
        <span className={`${themeStyles.textPrimary} opacity-90 flex items-center justify-center gap-3`}>
           <span className="relative inline-block opacity-70">
             {t('hero.cute_2')}
             {/* Custom Squiggle SVG Overlay */}
             <svg 
               viewBox="0 0 100 20" 
               className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-visible ${isDark ? 'text-teal-300' : 'text-teal-500'}`}
               style={{ transform: 'translateY(10%) scale(1.05)' }}
             >
               <path 
                 d="M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10" 
                 fill="none" 
                 stroke="currentColor" 
                 strokeWidth="4"
                 strokeLinecap="round"
               />
             </svg>
           </span>
           {t('hero.cute_3')}
        </span>
      </h2>
    );
  }

  // Normal Mode
  return (
    <h2 className={`mt-8 text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto ${themeStyles.textSecondary}`}>
      {t('hero.normal_1')} <br />
      <span className={`${themeStyles.textPrimary} opacity-80`}>{t('hero.normal_2')}</span>
    </h2>
  );
};

export default HeroTitle;