import React from 'react';
import { useTranslation } from 'react-i18next';
import InstructionText from '../../Hacker/InstructionText';
import CuteInstructionText from '../../Cute/InstructionText';

const IntroText = ({ settings, isSettingsOpen }) => {
  const { t } = useTranslation();

  return (
    <p className="max-w-xl mx-auto text-sm md:text-base opacity-70 leading-relaxed transition-all duration-300">
      {settings.themeMode === 'hacker' ? (
        <>
          {/* Prefix: Accessing forbidden memory segments. */}
          {t('hero.intro_hacker')}{" "}
          
          {/* Dynamic Middle: Hover instruction */}
          <InstructionText 
            globalDecrypted={settings.globalDecrypted} 
            isSettingsOpen={isSettingsOpen} 
          />
          
          {/* Suffix: Proceed with caution. */}
          {" "}{t('hero.intro_hacker_action')}
        </>
      ) : settings.themeMode === 'cute' ? (
        <>
          {/* Prefix: Accessing forbidden cookie jars. */}
          {t('hero.intro_cute')}
          
          {/* Dynamic Middle: Magic sugar instruction */}
          <CuteInstructionText 
            isConfettiOn={settings.cuteConfettiOn} 
            isSettingsOpen={isSettingsOpen}
          />
          
          {/* Suffix: Proceed with cuddles. */}
          {t('hero.intro_cute_action')}
        </>
      ) : (
        // Normal mode text
        t('hero.intro_normal')
      )}
    </p>
  );
};

export default IntroText;