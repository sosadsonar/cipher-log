import React from 'react';
import { RotateCcw } from 'lucide-react';
import ThemeSettings from '../Shared/ThemeSettings';
import HackerSettings from '../HackerSettings';
import CuteSettings from '../CuteSettings';
import FontSelector from '../Shared/FontSelector'; 

const SettingsContent = ({ 
  activeCategory, 
  settings, 
  updateSetting, 
  resetSettings, 
  isDark, 
  themeStyles, 
  setDescription,
  isCute
}) => {
  return (
    <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4">
      
      {activeCategory === 'theme' && (
        <ThemeSettings 
          settings={settings} 
          updateSetting={updateSetting} 
          isDark={isDark} 
          themeStyles={themeStyles} 
          setDescription={setDescription} 
        />
      )}

      {activeCategory === 'visual' && (
        <>
          {settings.themeMode === 'hacker' && (
            <HackerSettings 
              settings={settings} 
              updateSetting={updateSetting} 
              isDark={isDark} 
              themeStyles={themeStyles} 
              setDescription={setDescription} 
            />
          )}
          
          {settings.themeMode === 'cute' && (
            <CuteSettings 
              settings={settings} 
              updateSetting={updateSetting} 
              isDark={isDark} 
              themeStyles={themeStyles} 
              setDescription={setDescription} 
            />
          )}
          
          {settings.themeMode === 'normal' && (
            <div className={`text-center p-8 border border-dashed opacity-50 ${themeStyles.borderSecondary} ${themeStyles.textMuted} animate-in fade-in slide-in-from-right-4 duration-300`}>
              <p className="text-sm">Visual FX are disabled in Normal mode.</p>
            </div>
          )}
        </>
      )}

      {activeCategory === 'typography' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <FontSelector 
            selectedFontName={settings.fontFamily}
            onSelectFont={(name) => updateSetting('fontFamily', name)}
            customFontOn={settings.customFontOn}
            onToggleCustom={() => updateSetting('customFontOn', !settings.customFontOn)}
            customFontUrl={settings.customFontUrl}
            onUpdateCustomUrl={(val) => updateSetting('customFontUrl', val)}
            customFontFamily={settings.customFontFamily}
            onUpdateCustomFamily={(val) => updateSetting('customFontFamily', val)}
            isDark={isDark}
            themeStyles={themeStyles}
          />
        </div>
      )}

      {/* Mobile Reset Button */}
      <div className={`md:hidden pt-8 border-t border-dashed border-gray-700/50`}>
         <button
           onClick={resetSettings}
           className={`
             w-full flex items-center justify-center gap-2 text-xs uppercase font-bold py-3 border transition-all
             ${isDark ? 'border-red-900 text-red-500 hover:bg-red-900/30' : 'border-red-300 text-red-600 hover:bg-red-50'}
             ${isCute ? 'rounded-xl' : 'rounded-none'}
           `}
         >
           <RotateCcw size={14} />
           System Reset
         </button>
      </div>

    </div>
  );
};

export default SettingsContent;