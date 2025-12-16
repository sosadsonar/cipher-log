import React, { useState, useEffect } from 'react';

const CuteInstructionText = ({ isConfettiOn, isSettingsOpen }) => {
  // Initialize based on prop
  const [status, setStatus] = useState(isConfettiOn ? 'visible' : 'gone');

  // Logic: Handle triggers based on settings window state
  useEffect(() => {
    if (isConfettiOn) {
      // If turned ON, show immediately (even if settings open, to show feedback)
      setStatus('visible');
    } else {
      // If turned OFF...
      if (!isSettingsOpen && status === 'visible') {
        // ...and settings just closed (or are closed), start exit animation
        setStatus('selecting');
      }
      // If settings are OPEN, we do nothing yet (keep 'visible' until closed)
    }
  }, [isConfettiOn, isSettingsOpen, status]);

  // Logic: Handle animation timing
  useEffect(() => {
    let timer;
    if (status === 'selecting') {
      timer = setTimeout(() => {
        setStatus('gone');
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [status]);

  // When gone, return a single space to reserve spacing between sentences
  if (status === 'gone') return ' ';

  return (
    <span 
      className={`
        transition-all duration-300 inline-block px-1 rounded-md mx-1
        ${status === 'selecting' 
          ? 'bg-pink-300 text-white scale-105 shadow-pink-200 shadow-lg' 
          : ''}
      `}
    >
      Hover over snack blocks to sprinkle magic sugar.
    </span>
  );
};

export default CuteInstructionText;