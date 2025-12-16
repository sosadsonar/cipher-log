import React from 'react';
import InstructionText from '../../Hacker/InstructionText';
import CuteInstructionText from '../../Cute/InstructionText';

const IntroText = ({ settings, isSettingsOpen }) => {
  return (
    <p className="max-w-xl mx-auto text-sm md:text-base opacity-70 leading-relaxed transition-all duration-300">
      {settings.themeMode === 'hacker' ? (
        <>
          Accessing forbidden memory segments.{" "}
          <InstructionText globalDecrypted={settings.globalDecrypted} isSettingsOpen={isSettingsOpen} />
          {" "}Proceed with caution.
        </>
      ) : settings.themeMode === 'cute' ? (
        <>
          Accessing forbidden cookie jars.
          <CuteInstructionText 
            isConfettiOn={settings.cuteConfettiOn} 
            isSettingsOpen={isSettingsOpen}
          />
          Proceed with cuddles.
        </>
      ) : (
        "Explore the latest updates and technical deep dives below."
      )}
    </p>
  );
};

export default IntroText;