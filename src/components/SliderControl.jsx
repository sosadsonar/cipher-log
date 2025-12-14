import React from 'react';
import { Clock } from 'lucide-react';

const SliderControl = ({ label, value, min, max, step, onChange, unit = "s", isDark }) => (
  <div className={`
    mt-3 pt-3 pl-8 pr-2 border-t border-dashed
    ${isDark ? 'border-green-900/50' : 'border-slate-300'}
    animate-in slide-in-from-top-2 duration-300
  `}>
    <div className="flex justify-between items-center mb-1 text-[10px] uppercase tracking-widest font-mono">
      <span className="opacity-70 flex items-center gap-2">
        <Clock size={10} /> {label}
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
        w-full h-1 appearance-none cursor-pointer focus:outline-none focus:opacity-100
        ${isDark ? 'text-green-500' : 'text-slate-800'}
      `}
    />
  </div>
);

export default SliderControl;