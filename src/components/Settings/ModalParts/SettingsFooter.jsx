import React from 'react';

const SettingsFooter = ({ description, isDark, themeStyles }) => {
  return (
    <div className={`
      p-3 md:p-4 min-h-[3rem] md:min-h-[4rem] text-[10px] md:text-xs font-mono border-t border-inherit flex-shrink-0
      ${isDark ? 'bg-white/5' : 'bg-black/5'} ${themeStyles.textMuted}
    `}>
       <span className="opacity-50 mr-2">{`>`}</span>
       <span className="typewriter-cursor">{description}</span>
    </div>
  );
};

export default SettingsFooter;