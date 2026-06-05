import { AlertTriangle, AlertCircle, TrendingUp, GitFork, Zap } from 'lucide-react';
import { analyzeRepositoryRisks } from '../utils/riskAnalysis';

const RiskIndicator = ({ repo }) => {
  const analysis = analyzeRepositoryRisks(repo);
  const { risks, warnings, riskLevel } = analysis;

  if (riskLevel === 'low') {
    return null; // No indicator for low-risk repos
  }

  const getRiskIcon = (type) => {
    switch (type) {
      case 'recent':
        return <Zap className="w-3.5 h-3.5" />;
      case 'stars':
        return <TrendingUp className="w-3.5 h-3.5" />;
      case 'fork':
        return <GitFork className="w-3.5 h-3.5" />;
      case 'releases':
        return <AlertCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-900/40 border-red-700/50 text-red-200';
      case 'medium':
        return 'bg-orange-900/40 border-orange-700/50 text-orange-200';
      case 'low':
        return 'bg-yellow-900/40 border-yellow-700/50 text-yellow-200';
      default:
        return 'bg-gray-900/40 border-gray-700/50 text-gray-200';
    }
  };

  return (
    <div className="space-y-2">
      {/* High-risk indicators */}
      {risks.length > 0 && (
        <div className="space-y-1.5">
          {risks.map((risk, idx) => (
            <div
              key={`risk-${idx}`}
              className={`flex items-start gap-2 px-3 py-2 rounded-lg border ${getSeverityColor(
                risk.severity
              )}`}
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{risk.label}</div>
                <div className="text-xs opacity-80">{risk.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Medium/Low warnings */}
      {warnings.length > 0 && (
        <div className="space-y-1.5">
          {warnings.map((warning, idx) => (
            <div
              key={`warning-${idx}`}
              className={`flex items-start gap-2 px-3 py-2 rounded-lg border ${getSeverityColor(
                warning.severity
              )}`}
            >
              {getRiskIcon(warning.type)}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{warning.label}</div>
                <div className="text-xs opacity-80">{warning.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiskIndicator;
