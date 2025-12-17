import React from 'react';
import { Wifi, Monitor, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Import

const SystemStatus = ({ systemInfo, isDark, themeStyles }) => {
  const { t } = useTranslation(); // 2. Hook

  return (
    <div className={`
      inline-flex flex-col items-center gap-2 px-6 py-3 border rounded text-xs uppercase opacity-80 transition-colors duration-500
      ${themeStyles.borderSecondary} ${themeStyles.borderDashed}
      ${isDark ? 'bg-white/5' : 'bg-black/5'}
    `}>
      <div className="flex items-center gap-3 w-full justify-center">
        <Wifi 
          size={12} 
          className={systemInfo.secure ? (isDark ? "text-green-500" : "text-green-600") : "animate-pulse text-red-500"} 
        />
        {/* 3. Localize Secure/Open Link */}
        <span>{systemInfo.secure ? t('hero.sys_secure') : t('hero.sys_open')}</span>
        <span className="opacity-30">|</span>
        {/* 3. Localize Node */}
        <span className="font-bold">{t('hero.sys_node')}: {systemInfo.node}</span>
      </div>

      <div className="w-full h-px opacity-20 bg-current"></div>

      <div className="flex items-center gap-2 w-full justify-center">
        <Monitor size={12} />
        {/* 3. Localize OS */}
        <span>{t('hero.sys_os')}: {systemInfo.os}</span>
      </div>

      <div className="flex items-center gap-2 w-full justify-center">
        <Globe size={12} />
        {/* 3. Localize IP */}
        <span>{t('hero.sys_ip')}: {systemInfo.ip}</span>
      </div>
    </div>
  );
};

export default SystemStatus;