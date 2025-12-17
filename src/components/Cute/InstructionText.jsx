import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CuteInstructionText = ({ isConfettiOn, isSettingsOpen }) => {
  const { t } = useTranslation();
  
  const [status, setStatus] = useState(isConfettiOn ? 'visible' : 'gone');

  useEffect(() => {
    if (isConfettiOn) {
      setStatus('visible');
    } else {
      if (!isSettingsOpen && status === 'visible') {
        setStatus('selecting');
      }
    }
  }, [isConfettiOn, isSettingsOpen, status]);

  useEffect(() => {
    let timer;
    if (status === 'selecting') {
      timer = setTimeout(() => {
        setStatus('gone');
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [status]);

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
      {t('instructions.cute_hover')}
    </span>
  );
};

export default CuteInstructionText;