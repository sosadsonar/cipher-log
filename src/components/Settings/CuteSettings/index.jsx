import React from 'react';
import GeneralToggles from './GeneralToggles';
import ParticleSelector from './ParticleSelector';
import EffectSliders from './EffectSliders';
import { PARTICLE_TYPES } from './constants';

const CuteSettings = ({ settings, updateSetting, isDark, themeStyles, setDescription }) => {
  
  if (settings.themeMode !== 'cute') {
    return (
      <div className={`text-center p-8 border border-dashed opacity-50 ${themeStyles.borderSecondary} ${themeStyles.textMuted} animate-in fade-in slide-in-from-right-4 duration-300`}>
        <p className="text-sm">Cute FX are disabled in {settings.themeMode} mode.</p>
      </div>
    );
  }

  // Force pink color class for Cute settings specifically to ensure sliders match
  const cuteTextColor = isDark ? 'text-pink-300' : 'text-rose-500';
  
  // Find current particle label for the slider text
  const currentParticle = PARTICLE_TYPES.find(p => p.id === settings.cuteParticleType) || PARTICLE_TYPES[0];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* 1. Toggles (Intro, Confetti, Master FX) */}
      <GeneralToggles 
        settings={settings}
        updateSetting={updateSetting}
        isDark={isDark}
        themeStyles={themeStyles}
        setDescription={setDescription}
      />

      {/* 2. Detailed Controls (Only if Master FX is ON) */}
      {settings.cuteEffectsOn && (
        <>
          <ParticleSelector 
            settings={settings}
            updateSetting={updateSetting}
            isDark={isDark}
            themeStyles={themeStyles}
            setDescription={setDescription}
          />

          <EffectSliders 
            settings={settings}
            updateSetting={updateSetting}
            isDark={isDark}
            themeStyles={themeStyles}
            cuteTextColor={cuteTextColor}
            particleLabel={currentParticle.label}
          />
        </>
      )}
    </div>
  );
};

export default CuteSettings;