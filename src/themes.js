// Theme Definitions
export const getThemeStyles = (mode, isDark) => {
  const styles = {
    hacker: {
      // Backgrounds
      appBg: isDark ? 'bg-[#050505]' : 'bg-[#f0f2f5]',
      cardBg: isDark ? 'bg-black/40' : 'bg-white/60',
      headerBg: isDark ? 'bg-black/70' : 'bg-white/70',
      modalBg: isDark ? 'bg-black' : 'bg-white',
      
      // Text
      textPrimary: isDark ? 'text-green-500' : 'text-slate-800',
      textSecondary: isDark ? 'text-green-400' : 'text-slate-900', // Headings
      textMuted: isDark ? 'text-green-700' : 'text-slate-400',
      
      // Borders
      borderPrimary: isDark ? 'border-green-500' : 'border-slate-800',
      borderSecondary: isDark ? 'border-green-900' : 'border-slate-300',
      borderDashed: 'border-dashed', // Hacker trait
      
      // Accents
      accentColor: isDark ? '#22c55e' : '#1e293b', // For inline styles
      
      // Shapes
      rounded: 'rounded-sm', // Sharp
      roundedBtn: 'rounded-sm',
      
      // Effects
      hasScanline: true,
      hasGlitch: true,
      hasFlicker: true,
      hasEncryption: true,
    },
    cute: {
      // Backgrounds - UPDATED for softer dark mode
      appBg: isDark ? 'bg-[#251822]' : 'bg-rose-50', // Deep Plum / Soft Rose
      cardBg: isDark ? 'bg-[#36202d]/90' : 'bg-white/80',
      headerBg: isDark ? 'bg-[#251822]/90' : 'bg-rose-50/80',
      modalBg: isDark ? 'bg-[#36202d]' : 'bg-white', // Matches card background
      
      // Text
      textPrimary: isDark ? 'text-pink-200' : 'text-rose-500',
      textSecondary: isDark ? 'text-pink-100' : 'text-rose-600',
      textMuted: isDark ? 'text-pink-800' : 'text-rose-300',
      
      // Borders
      borderPrimary: isDark ? 'border-pink-400' : 'border-rose-400',
      borderSecondary: isDark ? 'border-pink-900/50' : 'border-rose-200',
      borderDashed: 'border-solid', // Solid lines for cute
      
      // Accents
      accentColor: isDark ? '#f472b6' : '#fb7185',
      
      // Shapes
      rounded: 'rounded-3xl', // Very rounded
      roundedBtn: 'rounded-full',
      
      // Effects
      hasScanline: false,
      hasGlitch: false,
      hasFlicker: false,
      hasEncryption: false,
    },
    normal: {
      // Backgrounds
      appBg: isDark ? 'bg-gray-900' : 'bg-gray-100',
      cardBg: isDark ? 'bg-gray-800' : 'bg-white',
      headerBg: isDark ? 'bg-gray-900/90' : 'bg-white/90',
      modalBg: isDark ? 'bg-gray-800' : 'bg-white',
      
      // Text
      textPrimary: isDark ? 'text-gray-300' : 'text-gray-600',
      textSecondary: isDark ? 'text-white' : 'text-gray-900',
      textMuted: isDark ? 'text-gray-600' : 'text-gray-400',
      
      // Borders
      borderPrimary: isDark ? 'border-blue-500' : 'border-blue-600',
      borderSecondary: isDark ? 'border-gray-700' : 'border-gray-200',
      borderDashed: 'border-solid',
      
      // Accents
      accentColor: isDark ? '#3b82f6' : '#2563eb',
      
      // Shapes
      rounded: 'rounded-lg', // Standard
      roundedBtn: 'rounded-md',
      
      // Effects
      hasScanline: false,
      hasGlitch: false,
      hasFlicker: false,
      hasEncryption: false,
    }
  };

  return styles[mode] || styles.hacker;
};