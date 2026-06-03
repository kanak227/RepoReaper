const RepoCardSkeleton = ({ mode = 'reaper' }) => {
  const accent = mode === 'reaper' ? 'bg-blue-500/70' : 'bg-yellow-500/70';
  const accentSoft = mode === 'reaper' ? 'bg-blue-500/20' : 'bg-yellow-500/20';

  return (
    <div className={`relative flex flex-col min-h-[156px] p-4 rounded-2xl cursor-wait border overflow-hidden bg-black/90 animate-pulse shadow-[0_18px_40px_rgba(0,0,0,0.35)] ${mode === 'reaper' ? 'border-blue-900/60' : 'border-yellow-900/60'}`}>
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${mode === 'reaper' ? 'from-blue-500 via-cyan-400 to-purple-500' : 'from-yellow-400 via-orange-400 to-red-400'}`}></div>
      <div className="flex justify-between items-start mb-3 pt-1">
        <div className="flex-1 pr-3">
          <div className={`h-5 w-3/4 rounded-md mb-2 ${accentSoft}`}></div>
          <div className={`h-3 w-1/2 rounded-md ${accentSoft}`}></div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${accentSoft} ${mode === 'reaper' ? 'border-blue-400/50' : 'border-yellow-400/50'}`}></div>
      </div>

      <div className="mt-auto pt-4 flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-1.5 min-w-[90px]">
          <div className={`w-2 h-2 rounded-full ${accent}`}></div>
          <div className={`h-3 w-16 rounded-md ${accentSoft}`}></div>
        </div>

        <div className="flex items-center gap-1.5 min-w-[88px] ml-1">
          <div className={`w-3 h-3 rounded-md ${accentSoft}`}></div>
          <div className={`h-3 w-14 rounded-md ${accentSoft}`}></div>
        </div>

        <div className="w-full mt-1">
          <div className={`h-3 w-28 rounded-md ${accentSoft}`}></div>
        </div>
      </div>
    </div>
  );
};

const RepoSkeleton = ({ count = 6, className = '', mode = 'reaper' }) => {
  return (
    <div
      className={`w-full rounded-3xl border border-white/5 bg-black/40 p-4 md:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] ${className}`.trim()}
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