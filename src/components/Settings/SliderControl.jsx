import React from 'react';
// Clock import removed

const SliderControl = ({ label, value, min, max, step, onChange, unit = "s", isDark, themeStyles, icon }) => {
  // Use theme color if available, default to slate/green
  const textColor = themeStyles 
    ? themeStyles.textPrimary 
    : (isDark ? 'text-green-500' : 'text-slate-800');

  const borderClass = themeStyles 
    ? themeStyles.borderSecondary
    : (isDark ? 'border-green-900/50' : 'border-slate-300');

  return (
    <div className={`
      mt-3 pt-3 pl-8 pr-2 border-t border-dashed
      ${borderClass}
      animate-in slide-in-from-top-2 duration-300
    `}>
      <div className={`flex justify-between items-center mb-2 text-[10px] uppercase tracking-widest font-mono ${textColor} opacity-80`}>
        <span className="flex items-center gap-2">
          {icon} 
          <span>{label}</span>
        </span>
        <span>{value}{unit}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`
          w-full h-1 appearance-none cursor-pointer focus:outline-none
          ${textColor} /* IMPORTANT: This sets 'currentColor' for the track/thumb CSS */
        `}
      />
    </div>
  );
};

export default SliderControl;