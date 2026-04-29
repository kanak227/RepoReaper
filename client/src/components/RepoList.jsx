import { formatDistanceToNow } from 'date-fns';
import { useAppStore } from '../store/app.store';

const RepoList = ({ repos, selected, setSelected }) => {
  const { mode } = useAppStore();
  const toggleSelect = (fullName) => {
    setSelected((prev) =>
      prev.includes(fullName)
        ? prev.filter((r) => r !== fullName)
        : [...prev, fullName]
    );
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
          return (
            <div
              key={repo.id}
              onClick={() => toggleSelect(repo.full_name)}
              className={`flex flex-col p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                isSelected 
                  ? (mode === 'reaper' ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-[0.98]' : 'bg-yellow-900/40 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-[0.98]') 
                  : 'bg-black/40 border-gray-800 hover:border-gray-600 hover:bg-gray-900/60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold truncate pr-2" title={repo.name}>
                  {repo.name}
                </h3>
                <div className={`w-5 h-5 rounded-full flex-shrink-0 border-2 flex items-center justify-center ${isSelected ? (mode === 'reaper' ? 'border-blue-400 bg-blue-500' : 'border-yellow-400 bg-yellow-500') : 'border-gray-600'}`}>
                  {isSelected && <svg className={`w-3 h-3 ${mode === 'reaper' ? 'text-white' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
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
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
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