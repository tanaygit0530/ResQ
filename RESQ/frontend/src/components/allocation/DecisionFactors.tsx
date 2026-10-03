import React from 'react';

interface DecisionFactorItem {
  name: string;
  score: number;
  weight: string;
  color: string;
  reason: string;
}

interface DecisionFactorsProps {
  factors: DecisionFactorItem[];
  globalScore: number;
}

export const DecisionFactors: React.FC<DecisionFactorsProps> = ({ factors, globalScore }) => {
  return (
    <div className="space-y-space-sm">
      <div className="flex items-center justify-between mb-space-sm">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-outline text-[18px]">tune</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-outline">
            Decision Objective Weights
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          Global Score: {globalScore} / 100
        </span>
      </div>

      <div className="space-y-space-sm">
        {factors.map((f, i) => (
          <div key={i} className="p-space-sm rounded-lg bg-surface-container-low">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                {f.name}
              </span>
              <span className="font-code-sm text-code-sm font-bold" style={{ color: f.color }}>
                {f.score} / 100 ({f.weight})
              </span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden mb-1">
              <div
                className="h-2 rounded-full"
                style={{ width: `${f.score}%`, backgroundColor: f.color }}
              />
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{f.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
