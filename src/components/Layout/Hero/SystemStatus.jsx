import React from 'react';
import { Wifi, Monitor, Globe } from 'lucide-react';

const SystemStatus = ({ systemInfo, isDark, themeStyles }) => {
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
        <span>{systemInfo.secure ? 'Secure Link' : 'Open Link'}</span>
        <span className="opacity-30">|</span>
        <span className="font-bold">Node: {systemInfo.node}</span>
      </div>

      <div className="w-full h-px opacity-20 bg-current"></div>

      <div className="flex items-center gap-2 w-full justify-center">
        <Monitor size={12} />
        <span>Detected OS: {systemInfo.os}</span>
      </div>

      <div className="flex items-center gap-2 w-full justify-center">
        <Globe size={12} />
        <span>Client IP: {systemInfo.ip}</span>
      </div>
    </div>
  );
};

export default SystemStatus;