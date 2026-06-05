import { AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getHighRiskRepositories } from '../utils/riskAnalysis';
import RiskIndicator from './RiskIndicator';
import { useRepoReleases } from '../hooks/useRepoReleases';

const RiskAnalysisSummary = ({ repos, actionType }) => {
  const [enrichedRepos, setEnrichedRepos] = useState(repos || []);
  
  // Fetch releases data for the repos
  const { releases, loading: releasesLoading } = useRepoReleases(
    repos?.map(r => r.full_name) || [],
    actionType === 'delete'
  );

  // Enrich repos with releases data
  useEffect(() => {
    if (repos && releases.size > 0) {
      const enriched = repos.map(repo => ({
        ...repo,
        releases_count: releases.get(repo.full_name) || 0,
      }));
      setEnrichedRepos(enriched);
    } else {
      setEnrichedRepos(repos || []);
    }
  }, [repos, releases]);

  if (!enrichedRepos || enrichedRepos.length === 0 || actionType !== 'delete') {
    return null;
  }

  const highRiskRepos = getHighRiskRepositories(enrichedRepos);

  if (highRiskRepos.length === 0) {
    return null;
  }

  const hasHighSeverityRisks = highRiskRepos.some(
    ({ analysis }) => analysis.risks.length > 0
  );

  return (
    <div className={`p-4 rounded-lg border ${
      hasHighSeverityRisks
        ? 'bg-red-950/30 border-red-800/50'
        : 'bg-orange-950/30 border-orange-800/50'
    }`}>
      <div className="flex gap-3 items-start mb-3">
        <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
          hasHighSeverityRisks ? 'text-red-400' : 'text-orange-400'
        }`} />
        <div>
          <h3 className={`font-semibold ${
            hasHighSeverityRisks ? 'text-red-300' : 'text-orange-300'
          }`}>
            Risk Analysis {releasesLoading && '(Loading release data...)'}
          </h3>
          <p className="text-sm text-gray-300 mt-1">
            {highRiskRepos.length} of {enrichedRepos.length} selected {enrichedRepos.length === 1 ? 'repository has' : 'repositories have'} potential risks:
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {highRiskRepos.map(({ repo, analysis }) => (
          <div key={repo.id} className="bg-black/40 border border-gray-800/50 rounded-lg p-3">
            <div className="flex justify-between items-start gap-2 mb-2">
              <a
                href={repo.html_url || `https://github.com/${repo.full_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-400 hover:text-blue-300 text-sm truncate flex-1"
              >
                {repo.full_name}
              </a>
              <span className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${
                analysis.riskLevel === 'high'
                  ? 'bg-red-900/40 text-red-300 border border-red-700/50'
                  : 'bg-orange-900/40 text-orange-300 border border-orange-700/50'
              }`}>
                {analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)} Risk
              </span>
            </div>

            <RiskIndicator repo={repo} />
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3 p-2 bg-black/30 rounded border border-gray-800/30">
        💡 <strong>Tip:</strong> Review high-risk repositories carefully before confirming deletion. This action cannot be undone.
      </p>
    </div>
  );
};

export default RiskAnalysisSummary;
