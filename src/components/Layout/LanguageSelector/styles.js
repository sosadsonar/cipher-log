export const getSelectorStyles = (themeMode, isDark) => {
  const isCute = themeMode === 'cute';

  return {
    // The main button in the header
    triggerBtn: isCute 
      ? '' // handled by parent classes passed in props usually, but we can standardize here if needed
      : '',

    // The dropdown container
    dropdown: isCute
      ? `rounded-2xl border-2 shadow-xl ${isDark ? 'bg-[#3d2434] border-pink-400' : 'bg-white border-rose-200'}`
      : `rounded-sm border ${isDark ? 'bg-black border-green-500' : 'bg-white border-gray-300'}`,

    // The search input field
    input: isCute
      ? `rounded-full border px-3 py-1.5 ${isDark ? 'bg-pink-900/20 border-pink-700 text-pink-200' : 'bg-rose-50 border-rose-200 text-rose-600'}`
      : `rounded-none border-b p-2 ${isDark ? 'bg-black border-green-800 text-green-400' : 'bg-white border-gray-300 text-black'}`,

    // The icon color in search
    searchIcon: isDark ? 'text-current' : 'text-gray-500',

    // Function to generate item classes based on active state
    getItemClass: (isActive) => {
      if (isCute) {
        return isActive 
          ? (isDark ? 'bg-pink-500/20 text-pink-200' : 'bg-rose-100 text-rose-600')
          : (isDark ? 'hover:bg-pink-500/10 text-pink-300' : 'hover:bg-rose-50 text-gray-600');
      }
      // Hacker/Normal
      return isActive
        ? (isDark ? 'bg-green-900/30 text-green-400' : 'bg-blue-100 text-blue-900')
        : (isDark ? 'hover:bg-green-900/20 text-gray-400 hover:text-green-400' : 'hover:bg-gray-100 text-gray-600');
    }
  };
};