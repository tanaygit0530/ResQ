import React from 'react';

interface ResqLogoProps {
  className?: string;
  size?: number;
}

export const ResqLogo: React.FC<ResqLogoProps> = ({ className = 'h-8 w-auto', size = 32 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#155EEF" />
      <path d="M16 7V25M7 16H25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3.5" fill="#FFFFFF" />
      <circle cx="16" cy="16" r="1.5" fill="#155EEF" />
    </svg>
  );
};
