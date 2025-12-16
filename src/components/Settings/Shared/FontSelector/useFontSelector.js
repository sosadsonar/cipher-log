import { useState, useEffect, useRef } from 'react';
import { AVAILABLE_FONTS } from '../../../../fonts';

export const useFontSelector = (customFontUrl, onUpdateCustomUrl, onUpdateCustomFamily) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [tempUrl, setTempUrl] = useState(customFontUrl);
  const dropdownRef = useRef(null);

  // Sync local temp URL with prop
  useEffect(() => {
    setTempUrl(customFontUrl);
  }, [customFontUrl]);

  // Click Outside Listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Fonts
  const filteredFonts = AVAILABLE_FONTS.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Google Font Import
  const handleImport = () => {
    if (!tempUrl) return;
    onUpdateCustomUrl(tempUrl);
    try {
      const urlObj = new URL(tempUrl);
      const familyParam = urlObj.searchParams.get("family");
      if (familyParam) {
        // "Open+Sans:ital,wght..." -> "Open Sans"
        const familyName = familyParam.split(':')[0].replace(/\+/g, ' ');
        onUpdateCustomFamily(familyName);
      }
    } catch (e) {
      console.error("Could not parse font URL", e);
    }
  };

  return {
    isOpen,
    setIsOpen,
    search,
    setSearch,
    tempUrl,
    setTempUrl,
    dropdownRef,
    filteredFonts,
    handleImport
  };
};