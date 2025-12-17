import { useState, useRef, useEffect } from 'react';
import { LANGUAGES } from './constants';

export const useLanguageSelector = (currentLangCode, updateSetting) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch(""); // Reset search on close
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Logic
  const filteredLangs = LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  // Find current language object
  const selectedLang = LANGUAGES.find(l => l.code === currentLangCode) || LANGUAGES[0];

  // Handler
  const handleSelect = (code) => {
    updateSetting('language', code);
    setIsOpen(false);
    setSearch("");
  };

  return {
    isOpen,
    setIsOpen,
    search,
    setSearch,
    dropdownRef,
    filteredLangs,
    selectedLang,
    handleSelect
  };
};