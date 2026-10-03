import React from 'react';

interface BlockedRoadLayerProps {
  isBlocked: boolean;
  onClick?: () => void;
}

export const BlockedRoadLayer: React.FC<BlockedRoadLayerProps> = ({ isBlocked, onClick }) => {
  if (!isBlocked) return null;

  return (
    <g className="blocked-roads-layer cursor-pointer" onClick={onClick}>
      {/* Blocked Hatch Hazard Segment: Bridge B12 */}
      <path
        d="M 610,220 L 670,225"
        stroke="url(#blockedHatch)"
        strokeLinecap="square"
        strokeWidth="12"
      />
      <rect fill="#DC2626" height="20" rx="3" width="20" x="630" y="215" />
      <text fill="#FFFFFF" fontSize="12" fontWeight="bold" x="635" y="229">
        ✕
      </text>
    </g>
  );
};
