import React from 'react';

const SettingToggle = ({ label, icon, isOn, onClick, onHover, isDark, themeStyles, children }) => {
  // Fallback to default hacker-ish styles if themeStyles is not passed (for compatibility)
  const containerClass = themeStyles 
    ? `${themeStyles.borderSecondary} hover:${themeStyles.borderPrimary} ${isDark ? 'bg-white/5' : 'bg-black/5'}`
    : (isDark ? 'border-green-900 bg-green-900/10 hover:border-green-500' : 'border-slate-300 bg-slate-100 hover:border-slate-500');

  const textClass = themeStyles 
    ? themeStyles.textPrimary 
    : (isDark ? 'text-green-400' : 'text-slate-800');

  const iconClass = themeStyles
    ? themeStyles.textSecondary
    : (isDark ? 'text-green-500' : 'text-slate-700');

  // For the toggle switch color, we use the accent color from theme or fallback
  const activeSwitchBg = themeStyles?.accentColor 
    ? { backgroundColor: isOn ? themeStyles.accentColor : undefined }
    : (isOn ? (isDark ? 'bg-green-500' : 'bg-slate-800') : (isDark ? 'bg-green-900/30' : 'bg-slate-300'));

  const switchBaseClass = themeStyles 
    ? (isOn ? '' : `${isDark ? 'bg-white/10' : 'bg-black/10'}`)
    : (isOn ? (isDark ? 'bg-green-500' : 'bg-slate-800') : (isDark ? 'bg-green-900/30' : 'bg-slate-300'));

  return (
    <div 
      onMouseEnter={onHover} 
      className={`
        w-full p-3 md:p-4 border rounded-sm transition-all duration-300
        ${containerClass}
        flex-shrink-0
      `}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 group focus:outline-none"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex-shrink-0 ${iconClass}`}>
            {icon}
          </div>
          <span className={`uppercase tracking-wider text-[10px] md:text-sm text-left truncate ${textClass}`}>
            {label}
          </span>
        </div>
        
        <div 
          className={`
            flex-shrink-0 w-12 h-6 rounded-full relative transition-colors duration-300
            ${!themeStyles?.accentColor && switchBaseClass}
          `}
          style={typeof activeSwitchBg === 'object' ? activeSwitchBg : {}}
        >
          {/* If using themeStyles, apply background color via style for the 'on' state to use exact theme hex */}
          {themeStyles && !isOn && (
             <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
          )}

          <div className={`
            absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300
            ${isOn ? 'left-7' : 'left-1'}
          `}></div>
        </div>
      </button>
      
      {isOn && children}
    </div>
  );
};

export default SettingToggle;