import React from 'react';
import { Settings, Sliders, X } from 'lucide-react';
import DaisyIcon from '../../../assets/DaisyIcon';
import { useTranslation } from 'react-i18next';

const SettingsHeader = ({ themeMode, onClose, themeStyles }) => {
  const { t } = useTranslation();

  const getHeaderDetails = () => {
    switch (themeMode) {
      case 'cute':
        return { 
          icon: <DaisyIcon size={20} />, 
          title: t('settings.title_cute') 
        };
      case 'normal':
        return { 
          icon: <Sliders size={20} />, 
          title: t('settings.title_normal') 
        };
      default: // hacker
        return { 
          icon: <Settings className="animate-spin-slow" size={20} />, 
          title: t('settings.title_hacker') 
        };
    }
  };

  const headerDetails = getHeaderDetails();

  return (
    <div className={`flex justify-between items-center p-4 md:p-6 border-b ${themeStyles.borderSecondary}`}>
      <div className={`flex items-center gap-2 ${themeStyles.textSecondary}`}>
        {headerDetails.icon}
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest">{headerDetails.title}</h2>
      </div>
      <button 
        onClick={onClose}
        className={`p-1 hover:opacity-70 transition-opacity ${themeStyles.textMuted}`}
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default SettingsHeader;