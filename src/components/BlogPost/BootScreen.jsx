import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

const BootScreen = ({ 
  themeMode, 
  themeStyles, 
  isDark, 
  bootDuration, 
  onBootComplete 
}) => {
  const [decryptionStage, setDecryptionStage] = useState(0);

  useEffect(() => {
    // Calculate timing steps based on the bootDuration
    const totalMs = bootDuration * 1000;
    const step1 = totalMs * 0.25; 
    const step2 = totalMs * 0.60; 
    const step3 = totalMs;        

    const t1 = setTimeout(() => setDecryptionStage(1), step1);
    const t2 = setTimeout(() => setDecryptionStage(2), step2);
    const t3 = setTimeout(() => {
      setDecryptionStage(3);
      onBootComplete(); // Notify parent to switch view
    }, step3);
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [bootDuration, onBootComplete]);

  // Theme-specific logs
  const hackerLines = [
    "Initiating Secure Handshake...",
    "Resolving Host...",
    "Key Exchange: RSA-4096 [OK]",
    "Verifying Signature...",
    "Connection Established.",
    "Decryption Daemon Started...",
    "Processing Payload..."
  ];

  const cuteLines = [
    "Baking Fresh Cookies...", 
    "Locating Secret Snack Stash...", 
    "Key Exchange: Rainbow Sprinkles [OK]", 
    "Checking for Cat Paws...", 
    "BFF Connection Established.", 
    "Starting the Cuddle Monster...", 
    "Processing Maximum Floof..." 
  ];

  const terminalLines = themeMode === 'cute' ? cuteLines : hackerLines;

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center font-mono space-y-4">
      <div className={`w-full max-w-md border p-4 relative overflow-hidden ${themeStyles.borderSecondary} ${themeStyles.borderDashed} ${themeStyles.rounded}`}>
         {/* Ping Animation */}
         <div className="absolute top-0 left-0 w-full h-1 bg-current animate-ping opacity-20" style={{ animationDuration: '1s' }}></div>
         
         {/* Logs */}
         {terminalLines.slice(0, decryptionStage === 0 ? 2 : decryptionStage === 1 ? 5 : 7).map((line, i) => (
           <div key={i} className="text-sm md:text-base opacity-80 mb-1">
             <span className="mr-2 opacity-50">{`>`}</span>
             {line}
           </div>
         ))}
         
         {/* Status */}
         <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest animate-pulse">
           <ShieldCheck size={16} />
           {decryptionStage === 0 ? "Handshaking" : "Decrypting"}
         </div>
         
         {/* Progress Bar */}
         <div className={`h-1 mt-2 w-full bg-gray-700/30`}>
            <div 
              className={`h-full transition-all ease-out ${isDark ? 'bg-green-500' : 'bg-slate-800'}`}
              style={{ 
                width: decryptionStage === 0 ? '10%' : decryptionStage === 1 ? '45%' : '100%',
                transitionDuration: `${bootDuration / 3}s`,
                backgroundColor: themeMode === 'cute' ? '#f472b6' : undefined 
              }}
            ></div>
         </div>
      </div>
    </div>
  );
};

export default BootScreen;