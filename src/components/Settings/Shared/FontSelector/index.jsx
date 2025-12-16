import React from 'react';
import { Link } from 'lucide-react';
import SettingToggle from '../SettingToggle'; // Adjust path if needed (it is in ../Shared/SettingToggle.jsx)
import { useFontSelector } from './useFontSelector';
import FontDropdown from './FontDropdown';
import CustomFontInput from './CustomFontInput';

const FontSelector = ({ 
  selectedFontName, 
  onSelectFont, 
  customFontOn, 
  onToggleCustom, 
  customFontUrl, 
  onUpdateCustomUrl, 
  onUpdateCustomFamily, 
  isDark,
  themeStyles 
}) => {
  
  // 1. Initialize Logic Hook
  const {
    isOpen, setIsOpen, search, setSearch, tempUrl, setTempUrl, 
    dropdownRef, filteredFonts, handleImport
  } = useFontSelector(customFontUrl, onUpdateCustomUrl, onUpdateCustomFamily);

  // 2. Prepare Style Classes Object
  const styles = {
    borderClass: themeStyles ? themeStyles.borderSecondary : (isDark ? 'border-green-800' : 'border-slate-300'),
    hoverBorderClass: themeStyles ? themeStyles.borderPrimary : (isDark ? 'border-green-500' : 'border-slate-500'),
    textClass: themeStyles ? themeStyles.textPrimary : (isDark ? 'text-green-400' : 'text-slate-800'),
    roundedClass: themeStyles ? themeStyles.roundedBtn : 'rounded-sm',
    bgClass: isDark ? 'bg-white/5' : 'bg-black/5',
    dropdownBg: themeStyles ? themeStyles.modalBg : (isDark ? 'bg-black' : 'bg-white'),
    isDark
  };

  return (
    <div className="space-y-4">
      
      {/* 3. The Dropdown Section */}
      <div className={`
        relative transition-all duration-300
        ${customFontOn ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'} 
      `}>
        <label className={`text-[10px] uppercase tracking-widest mb-2 block ${styles.textClass} opacity-70`}>
          Primary System Font
        </label>
        
        <FontDropdown 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          search={search}
          setSearch={setSearch}
          dropdownRef={dropdownRef}
          filteredFonts={filteredFonts}
          selectedFontName={selectedFontName}
          onSelectFont={onSelectFont}
          styles={styles}
        />
      </div>

      {/* 4. The Custom Font Toggle & Input */}
      <SettingToggle 
        label="Custom Override" 
        icon={<Link size={18}/>}
        isOn={customFontOn}
        onClick={onToggleCustom}
        onHover={() => {}}
        isDark={isDark}
        themeStyles={themeStyles}
      >
        <CustomFontInput 
          tempUrl={tempUrl}
          setTempUrl={setTempUrl}
          handleImport={handleImport}
          styles={styles}
        />
      </SettingToggle>

    </div>
  );
};

export default FontSelector;