import React from 'react';

interface VerificationStatusProps {
  verified: boolean;
  text?: string;
}

export const VerificationStatus: React.FC<VerificationStatusProps> = ({
  verified,
  text = 'Verified',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm font-medium ${
        verified
          ? 'bg-secondary-fixed text-on-secondary-fixed'
          : 'bg-amber-100 text-amber-900'
      }`}
    >
      <span className="material-symbols-outlined text-[13px] text-secondary">
        {verified ? 'check' : 'pending'}
      </span>
      <span>{text}</span>
    </span>
  );
};
