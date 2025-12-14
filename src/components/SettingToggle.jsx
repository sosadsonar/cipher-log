import React from 'react';

const SettingToggle = ({ label, icon, isOn, onClick, onHover, isDark, children }) => (
  <div 
    /*The hover listener is on this parent div. 
      This ensures the description stays active when interacting 
      with the expanded slider (children).
    */
    onMouseEnter={onHover} 
    className={`
      w-full p-4 border rounded-sm transition-all duration-300
      ${isDark 
        ? 'border-green-900 bg-green-900/10 hover:border-green-500' 
        : 'border-slate-300 bg-slate-100 hover:border-slate-500'
      }
    `}
  >
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between group focus:outline-none"
    >
      <div className="flex items-center gap-3">
        <div className={`${isDark ? 'text-green-500' : 'text-slate-700'}`}>
          {icon}
        </div>
        <span className={`uppercase tracking-wider text-sm ${isDark ? 'text-green-400' : 'text-slate-800'}`}>
          {label}
        </span>
      </div>
      
      <div className={`
        w-12 h-6 rounded-full relative transition-colors duration-300
        ${isOn 
          ? (isDark ? 'bg-green-500' : 'bg-slate-800') 
          : (isDark ? 'bg-green-900/30' : 'bg-slate-300')
        }
      `}>
        <div className={`
          absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300
          ${isOn ? 'left-7' : 'left-1'}
        `}></div>
      </div>
    </button>
    
    {isOn && children}
  </div>
);

export default SettingToggle;