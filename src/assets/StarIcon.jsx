import React from 'react';

const StarIcon = ({ className, style }) => (
  <svg 
    viewBox="0 0 100 120" 
    fill="currentColor" 
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
     <path d="M 50 0 Q 50 60 85 60 Q 50 60 50 120 Q 50 60 15 60 Q 50 60 50 0 Z" />
  </svg>
);

export default StarIcon;