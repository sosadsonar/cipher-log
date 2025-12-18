import React from 'react';
import { Terminal, Heart, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CardFooter = ({ themeMode, isHovered, themeStyles }) => {
  const { t } = useTranslation();
  
  const getIcon = () => {
    if (themeMode === 'cute') return <Heart size={14} className={isHovered ? 'fill-current' : ''} />;
    if (themeMode === 'normal') return <FileText size={14} />;
    return <Terminal size={14} />;
  };

  return (
    <div className={`
      mt-4 pt-4 border-t flex items-center justify-between
      transition-opacity duration-300 z-10 relative
      ${themeStyles.borderSecondary}
      ${themeStyles.borderDashed}
      ${themeMode === 'hacker' ? (isHovered ? 'opacity-100' : 'opacity-0') : 'opacity-50 group-hover:opacity-100'}
    `}>
      <span className={`text-xs uppercase ${themeMode === 'hacker' ? 'animate-pulse' : ''}`}>
         {themeMode === 'hacker' ? t('card.read_hacker') : t('card.read_article')}
      </span>
      {getIcon()}
    </div>
  );
};

export default CardFooter;