import { useState, useEffect } from 'react';

export const useSystemDiagnostics = () => {
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [systemInfo, setSystemInfo] = useState({
    node: 'Initializing...',
    os: 'Analyzing...',
    ip: 'Tracing...',
    secure: false
  });

  useEffect(() => {
    const runDiagnostics = async () => {
      const hostname = window.location.hostname;
      const isSecure = window.location.protocol === 'https:';
      
      let osName = "Unknown Shell";
      const ua = navigator.userAgent;
      if (ua.indexOf("Win") !== -1) osName = "Windows NT";
      if (ua.indexOf("Mac") !== -1) osName = "MacOS";
      if (ua.indexOf("Linux") !== -1) osName = "Linux Kernel";
      if (ua.indexOf("Android") !== -1) osName = "Android OS";
      if (ua.indexOf("like Mac") !== -1) osName = "iOS";

      setSystemInfo(prev => ({
        ...prev,
        node: hostname === 'localhost' || hostname === '127.0.0.1' ? 'Localhost' : hostname,
        os: osName,
        secure: isSecure
      }));

      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setSystemInfo(prev => ({ ...prev, ip: data.ip }));
      } catch (e) {
        setSystemInfo(prev => ({ ...prev, ip: '::1 (Hidden)' }));
      }
    };

    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android|ipad|iphone|ipod|windows phone/i.test(userAgent)) {
        setShowMobileWarning(true);
      }
    };

    runDiagnostics();
    checkMobile();
  }, []);

  return { 
    systemInfo, 
    showMobileWarning, 
    closeMobileWarning: () => setShowMobileWarning(false) 
  };
};