import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BackButton = ({ onBack, themeMode, themeStyles }) => {
  const { t } = useTranslation();

  return (
    <button 
      onClick={onBack}
      className={`flex items-center gap-2 mb-8 uppercase tracking-widest text-xs hover:underline ${themeStyles.textMuted}`}
    >
      <ArrowLeft size={16} /> 
      {themeMode === 'hacker' ? t('post.back_hacker') : t('post.back_normal')}
    </button>
  );
};

export default BackButton;