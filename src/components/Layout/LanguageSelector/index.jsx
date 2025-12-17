import React from 'react';
import { useLanguageSelector } from './useLanguageSelector';
import { getSelectorStyles } from './styles';
import TriggerButton from './TriggerButton';
import LanguageDropdown from './LanguageDropdown';

const LanguageSelector = ({ settings, updateSetting, isDark, themeStyles }) => {
  
  // 1. Initialize Logic Hook
  const {
    isOpen,
    setIsOpen,
    search,
    setSearch,
    dropdownRef,
    filteredLangs,
    selectedLang,
    handleSelect
  } = useLanguageSelector(settings.language, updateSetting);

  // 2. Compute Styles based on theme
  const styles = getSelectorStyles(settings.themeMode, isDark);

  return (
    <div className="relative" ref={dropdownRef}>
      
      <TriggerButton 
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        selectedLang={selectedLang}
        themeStyles={themeStyles}
      />

      {isOpen && (
        <LanguageDropdown 
          styles={styles}
          search={search}
          setSearch={setSearch}
          filteredLangs={filteredLangs}
          currentLangCode={settings.language}
          onSelect={handleSelect}
          themeStyles={themeStyles}
        />
      )}
    </div>
  );
};

export default LanguageSelector;