import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ onBack, themeMode, themeStyles }) => {
  return (
    <button 
      onClick={onBack}
      className={`flex items-center gap-2 mb-8 uppercase tracking-widest text-xs hover:underline ${themeStyles.textMuted}`}
    >
      <ArrowLeft size={16} /> {themeMode === 'hacker' ? 'Abort Connection' : 'Back to Home'}
    </button>
  );
};

export default BackButton;