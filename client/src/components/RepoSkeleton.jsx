const RepoCardSkeleton = ({ mode = 'reaper' }) => {
  const accent = mode === 'reaper' ? 'bg-blue-500/70' : 'bg-yellow-500/70';
  const accentSoft = mode === 'reaper' ? 'bg-blue-500/20' : 'bg-yellow-500/20';

  return (
    <div className={`flex flex-col min-h-[136px] p-4 rounded-xl cursor-wait border bg-gray-900/70 animate-pulse shadow-[0_0_20px_rgba(0,0,0,0.25)] ${mode === 'reaper' ? 'border-blue-950/60' : 'border-yellow-950/60'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 pr-3">
          <div className={`h-5 w-3/4 rounded mb-2 ${accentSoft}`}></div>
          <div className={`h-3 w-1/2 rounded ${accentSoft}`}></div>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${accentSoft} ${mode === 'reaper' ? 'border-blue-400/40' : 'border-yellow-400/40'}`}></div>
      </div>

      <div className="mt-auto pt-4 flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-1.5 min-w-[90px]">
          <div className={`w-2 h-2 rounded-full ${accent}`}></div>
          <div className={`h-3 w-16 rounded ${accentSoft}`}></div>
        </div>

        <div className="flex items-center gap-1.5 min-w-[88px] ml-1">
          <div className={`w-3 h-3 rounded ${accentSoft}`}></div>
          <div className={`h-3 w-14 rounded ${accentSoft}`}></div>
        </div>

        <div className="w-full mt-1">
          <div className={`h-3 w-28 rounded ${accentSoft}`}></div>
        </div>
      </div>
    </div>
  );
};

const RepoSkeleton = ({ count = 6, className = '', mode = 'reaper' }) => {
  return (
    <div
  className={`w-full ${className}`.trim()}
  role="status"
  aria-live="polite"
  aria-busy={true}
>
  <span className="sr-only">Loading repositories...</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <RepoCardSkeleton key={index} mode={mode} />
        ))}
      </div>
    </div>
  );
};

export { RepoCardSkeleton };
export default RepoSkeleton;