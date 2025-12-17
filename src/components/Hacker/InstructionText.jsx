import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const InstructionText = ({ globalDecrypted, isSettingsOpen }) => {
  const { t } = useTranslation();
  
  const [status, setStatus] = useState(globalDecrypted ? 'gone' : 'visible');

  useEffect(() => {
    if (!globalDecrypted) {
      setStatus('visible');
    } else if (!isSettingsOpen && status === 'visible') {
      setStatus('selecting');
    }
  }, [globalDecrypted, isSettingsOpen, status]);

  useEffect(() => {
    let timer;
    if (status === 'selecting') {
      timer = setTimeout(() => {
        setStatus('gone');
      }, 600);
    }
    return () => clearTimeout(timer);
  }, [status]);

  if (status === 'gone') return null;

  return (
    <span 
      className={`
        transition-all duration-200 whitespace-pre-wrap
        ${status === 'selecting' 
          ? 'text-selection-anim' 
          : 'text-green-400/80'}
      `}
    >
      {t('instructions.hacker_hover')} 
    </span>
  );
};

export default InstructionText;