import React from 'react';
import { Terminal, Heart, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ThemeSettings = ({ settings, updateSetting, isDark, themeStyles, setDescription }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <p className={`text-xs uppercase tracking-widest mb-4 opacity-70 ${themeStyles.textPrimary}`}>
        {t('settings.sec_protocol')}
      </p>
      
      {/* Hacker Mode */}
      <button
        onClick={() => updateSetting('themeMode', 'hacker')}
        onMouseEnter={() => setDescription(t('settings.descriptions.theme_hacker'))} // UPDATED
        className={`w-full p-4 border rounded-sm flex items-center gap-4 transition-all ${settings.themeMode === 'hacker' ? (isDark ? 'bg-green-900/30 border-green-500' : 'bg-slate-200 border-slate-500') : (isDark ? 'border-green-900 hover:bg-green-900/10' : 'border-slate-300 hover:bg-slate-100')}`}
      >
        <Terminal size={24} className={isDark ? 'text-green-500' : 'text-slate-800'} />
        <div className="text-left">
          <div className={`font-bold uppercase tracking-widest ${isDark ? 'text-green-400' : 'text-slate-900'}`}>
            {t('settings.theme_hacker_title')}
          </div>
          <div className={`text-[10px] ${isDark ? 'text-green-600' : 'text-slate-500'}`}>
            {t('settings.theme_hacker_desc')}
          </div>
        </div>
      </button>

      {/* Cute Mode */}
      <button
        onClick={() => updateSetting('themeMode', 'cute')}
        onMouseEnter={() => setDescription(t('settings.descriptions.theme_cute'))} // UPDATED
        className={`w-full p-4 border rounded-3xl flex items-center gap-4 transition-all ${settings.themeMode === 'cute' ? (isDark ? 'bg-pink-900/30 border-pink-400' : 'bg-rose-100 border-rose-400') : (isDark ? 'border-pink-900 hover:bg-pink-900/10' : 'border-rose-200 hover:bg-rose-50')}`}
      >
        <Heart size={24} className={isDark ? 'text-pink-400' : 'text-rose-500'} />
        <div className="text-left">
          <div className={`font-bold tracking-wide ${isDark ? 'text-pink-300' : 'text-rose-600'}`}>
            {t('settings.theme_cute_title')}
          </div>
          <div className={`text-[10px] ${isDark ? 'text-pink-500' : 'text-rose-400'}`}>
            {t('settings.theme_cute_desc')}
          </div>
        </div>
      </button>

      {/* Normal Mode */}
      <button
        onClick={() => updateSetting('themeMode', 'normal')}
        onMouseEnter={() => setDescription(t('settings.descriptions.theme_normal'))} // UPDATED
        className={`w-full p-4 border rounded-lg flex items-center gap-4 transition-all ${settings.themeMode === 'normal' ? (isDark ? 'bg-gray-700 border-blue-500' : 'bg-gray-100 border-blue-600') : (isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50')}`}
      >
        <FileText size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
        <div className="text-left">
          <div className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
            {t('settings.theme_normal_title')}
          </div>
          <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('settings.theme_normal_desc')}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ThemeSettings;