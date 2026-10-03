import React from 'react';

interface RouteLayerProps {
  visible: boolean;
  rerouted?: boolean;
}

export const RouteLayer: React.FC<RouteLayerProps> = ({ visible, rerouted = false }) => {
  if (!visible) return null;

  return (
    <g className="routes-layer">
      {/* Active Dispatch Route 1: Sion Municipal to AMB-04 to Critical P-7F3A */}
      {!rerouted ? (
        <>
          <path
            className="animate-pulse"
            d="M 480,430 L 510,380 L 490,290 L 570,260"
            fill="none"
            stroke="#155EEF"
            strokeDasharray="6 4"
            strokeWidth="4"
          />
          <path d="M 570,260 L 650,230 L 680,180" fill="none" stroke="#155EEF" strokeWidth="4" />
        </>
      ) : (
        /* Dynamic Reroute avoiding Bridge B12 via high-elevation arterial */
        <>
          <path
            className="animate-pulse"
            d="M 480,430 L 460,370 L 440,310 L 510,230 L 600,180 L 680,180"
            fill="none"
            stroke="#155EEF"
            strokeDasharray="6 4"
            strokeWidth="4"
          />
        </>
      )}

      {/* Active Dispatch Route 2: AMB-12 to Lilavati Trauma Hub */}
      <path
        d="M 680,310 L 620,325 L 435,320 L 390,270"
        fill="none"
        stroke="#0284C7"
        strokeDasharray="5 3"
        strokeWidth="3.5"
      />
    </g>
  );
};
