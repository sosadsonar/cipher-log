import React, { useState } from 'react';
import { getThemeStyles } from '../../themes';

// Import Sub-Components from the ModalParts folder
import SettingsHeader from './ModalParts/SettingsHeader';
import SettingsSidebar from './ModalParts/SettingsSidebar';
import SettingsContent from './ModalParts/SettingsContent';
import SettingsFooter from './ModalParts/SettingsFooter';

const SettingsModal = ({ isOpen, onClose, isDark, settings, updateSetting, resetSettings }) => {
  const [activeCategory, setActiveCategory] = useState('theme');
  const [description, setDescription] = useState("Hover over an option to analyze functionality.");

  // 1. Get the current theme styles
  const themeStyles = getThemeStyles(settings.themeMode, isDark);

  // Helper boolean for styling logic
  const isCute = settings.themeMode === 'cute';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Window */}
      <div className={`
        relative w-full max-w-lg border-2 p-1 shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col
        ${themeStyles.modalBg} ${themeStyles.borderPrimary}
        /* Rounded corners for Cute mode */
        ${isCute ? 'rounded-[2rem] border-4' : 'rounded-sm'}
      `} style={{ height: '600px', maxHeight: '90vh' }}>
        
        <div className={`
          flex-grow p-0 border border-dashed flex flex-col overflow-hidden
          ${themeStyles.borderSecondary}
          /* Inner rounding to match outer shell */
          ${isCute ? 'rounded-[1.5rem]' : ''}
        `}>
          
          <SettingsHeader 
            themeMode={settings.themeMode}
            onClose={onClose}
            themeStyles={themeStyles}
            isCute={isCute}
          />

          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            
            <SettingsSidebar 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              resetSettings={resetSettings}
              setDescription={setDescription}
              isDark={isDark}
              themeStyles={themeStyles}
              isCute={isCute}
            />

            <SettingsContent 
              activeCategory={activeCategory}
              settings={settings}
              updateSetting={updateSetting}
              resetSettings={resetSettings}
              isDark={isDark}
              themeStyles={themeStyles}
              setDescription={setDescription}
              isCute={isCute}
            />

          </div>

          <SettingsFooter 
            description={description}
            isDark={isDark}
            themeStyles={themeStyles}
          />

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;