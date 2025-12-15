import React from 'react';

// Custom Daisy Icon for Cute Mode
// Petals spin around the static center (stamen)
const DaisyIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Static Stamen */}
    <circle cx="12" cy="12" r="2.5" fill="currentColor" className="opacity-50" />
    
    {/* Spinning Petals */}
    <g className="origin-center animate-spin-slow">
      <path d="M12 2 Q13.5 2 13.5 4.5 T12 7 Q10.5 7 10.5 4.5 T12 2Z" /> {/* Top */}
      <path d="M12 17 Q13.5 17 13.5 19.5 T12 22 Q10.5 22 10.5 19.5 T12 17Z" /> {/* Bottom */}
      <path d="M2 12 Q2 10.5 4.5 10.5 T7 12 Q7 13.5 4.5 13.5 T2 12Z" /> {/* Left */}
      <path d="M17 12 Q17 10.5 19.5 10.5 T22 12 Q22 13.5 19.5 13.5 T17 12Z" /> {/* Right */}
      
      {/* Diagonals */}
      <path d="M4.93 4.93 Q6 3.8 7.5 5.3 T6.7 8.1 Q5.6 9.2 4.1 7.7 T4.93 4.93Z" /> 
      <path d="M19.07 19.07 Q18 20.2 16.5 18.7 T17.3 15.9 Q18.4 14.8 19.9 16.3 T19.07 19.07Z" />
      <path d="M19.07 4.93 Q20.2 6 18.7 7.5 T15.9 6.7 Q14.8 5.6 16.3 4.1 T19.07 4.93Z" />
      <path d="M4.93 19.07 Q3.8 18 5.3 16.5 T8.1 17.3 Q9.2 18.4 7.7 19.9 T4.93 19.07Z" />
    </g>
  </svg>
);

export default DaisyIcon;