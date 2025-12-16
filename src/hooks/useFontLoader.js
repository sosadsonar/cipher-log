import { useEffect } from 'react';
import { AVAILABLE_FONTS } from '../fonts';

export const useFontLoader = (settings) => {
  useEffect(() => {
    const linkId = 'dynamic-font-link';
    let link = document.getElementById(linkId);
    
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (settings.customFontOn && settings.customFontUrl) {
      link.href = settings.customFontUrl;
    } else {
      const fontData = AVAILABLE_FONTS.find(f => f.name === settings.fontFamily);
      if (fontData && fontData.url) {
        link.href = fontData.url;
      } else {
        link.removeAttribute('href');
      }
    }
  }, [settings.fontFamily, settings.customFontOn, settings.customFontUrl]);
};