import { formatDistanceToNow } from 'date-fns';
import { Copy, Check, Shield } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppStore } from '../store/app.store';

const RepoList = ({ repos, selected, setSelected }) => {
  const { mode, safeList, toggleSafeRepo } = useAppStore();
  const [copiedId, setCopiedId] = useState(null);
  const copyResetTimerRef = useRef(null);

  const toggleSelect = (fullName) => {
    if (safeList && safeList.includes(fullName)) return;
    setSelected((prev) =>
      prev.includes(fullName)
        ? prev.filter((r) => r !== fullName)
        : [...prev, fullName]
    );
  };

  const showCopiedState = (repoId) => {
    setCopiedId(repoId);
    toast.success('Repository URL copied to clipboard.');

    if (copyResetTimerRef.current) {
      clearTimeout(copyResetTimerRef.current);
    }

    copyResetTimerRef.current = setTimeout(() => {
      setCopiedId(null);
      copyResetTimerRef.current = null;
    }, 2000);
  };

  const handleCopy = async (e, repo) => {
    e.stopPropagation();

    const url = repo?.html_url || (repo?.full_name ? `https://github.com/${repo.full_name}` : '');

    if (!url) {
      toast.error('No repository URL found.');
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showCopiedState(repo.id);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';

        document.body.appendChild(textarea);
        textarea.select();

        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (!copied) {
          throw new Error('execCommand copy failed');
        }

        showCopiedState(repo.id);
      } catch {
        toast.error('Failed to copy URL. Please try again.');
      }
    }
  };

  const formatSize = (kb) => {
    if (!kb) return '0 KB';
    if (kb < 1024) return `${kb} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => {
          const isSelected = selected.includes(repo.full_name);
          const isCopied = copiedId === repo.id;
          const isSafe = safeList && safeList.includes(repo.full_name);

          return (
            <div
              key={repo.id}
              onClick={() => toggleSelect(repo.full_name)}
              className={`flex flex-col p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                isSafe
                  ? 'bg-gray-900/20 border-gray-800 opacity-60 hover:opacity-100'
                  : isSelected
                    ? mode === 'reaper'
                      ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-[0.98]'
                      : 'bg-yellow-900/40 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-[0.98]'
                    : 'bg-black/40 border-gray-800 hover:border-gray-600 hover:bg-gray-900/60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-1.5 min-w-0 pr-2">
                  <h3 className="text-white font-semibold truncate" title={repo.name}>
                    {repo.name}
                  </h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSafeRepo(repo.full_name);
                      if (!isSafe && isSelected) {
                        setSelected((prev) => prev.filter((r) => r !== repo.full_name));
                      }
                    }}
                    className={`flex-shrink-0 rounded p-1 -m-1 transition-colors hover:bg-white/5 ${
                      isSafe
                        ? 'text-emerald-500'
                        : 'text-gray-600 hover:text-emerald-400'
                    }`}
                    title={isSafe ? "Unpin (Remove from Safe-List)" : "Pin (Add to Safe-List)"}
                  >
                    <Shield className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleCopy(e, repo)}
                    className={`flex-shrink-0 rounded p-1 -m-1 transition-colors hover:bg-white/5 ${
                      isCopied
                        ? mode === 'reaper'
                          ? 'text-blue-400'
                          : 'text-yellow-400'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                    title="Copy repository URL"
                    aria-label="Copy repository URL"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSafe
                        ? 'border-gray-700 bg-gray-800/50'
                        : isSelected
                          ? mode === 'reaper'
                            ? 'border-blue-400 bg-blue-500'
                            : 'border-yellow-400 bg-yellow-500'
                          : 'border-gray-600'
                    }`}
                  >
                    {isSafe && <Shield className="w-3 h-3 text-emerald-500/50" />}
                    {isSelected && !isSafe && (
                      <svg
                        className={`w-3 h-3 ${mode === 'reaper' ? 'text-white' : 'text-black'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 flex flex-wrap gap-2 text-xs text-gray-400 items-center">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${mode === 'reaper' ? 'bg-blue-400' : 'bg-yellow-400'}`}></span>
                    {repo.language}
                  </span>
                )}

                {repo.size > 0 && (
                  <span className="flex items-center gap-1 ml-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    {formatSize(repo.size)}
                  </span>
                )}

                {repo.updated_at && (
                  <span className="w-full mt-1 text-gray-500">
                    Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RepoList;