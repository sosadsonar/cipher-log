import React, { useState, useEffect } from 'react';

const InstructionText = ({ globalDecrypted, isSettingsOpen }) => {
  // States: 'visible' | 'selecting' | 'gone'
  const [status, setStatus] = useState('visible');

  // Effect 1: Handle triggers (Encryption on/off, Settings open/close)
  useEffect(() => {
    if (!globalDecrypted) {
      // Always reset if global decryption is off
      setStatus('visible');
    } else if (!isSettingsOpen && status === 'visible') {
      // Start animation sequence if decrypted, settings closed, and currently visible
      setStatus('selecting');
    }
  }, [globalDecrypted, isSettingsOpen, status]);

  // Effect 2: Handle animation timing sequence
  useEffect(() => {
    let timer;
    if (status === 'selecting') {
      // Hold selection highlighting for 600ms, then delete text
      timer = setTimeout(() => {
        setStatus('gone');
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [status]);

  if (status === 'gone') return null;

  // Render text with highlighting only
  return (
    <span 
      className={`
        transition-all duration-200 whitespace-pre-wrap
        ${status === 'selecting' 
          ? 'text-selection-anim' /* Green BG, Black Text */
          : 'text-green-400/80'}
      `}
    >
      Hover over data blocks to inject decryption keys. 
    </span>
  );
};

export default InstructionText;