const RepoCardSkeleton = ({ mode }) => {
  return (
    <div
      className={`flex flex-col p-4 rounded-xl border bg-black/40 animate-pulse ${
        mode === 'reaper'
          ? 'border-blue-900/60'
          : 'border-yellow-900/60'
      }`}
      aria-hidden="true"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start gap-1.5 min-w-0 pr-2 flex-1">
          <div className="h-5 w-28 rounded bg-white/10" />
          <div className="h-8 w-8 rounded p-1 -m-1 bg-white/5" />
        </div>

        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            mode === 'reaper'
              ? 'border-blue-900/80 bg-blue-950/80'
              : 'border-yellow-900/80 bg-yellow-950/80'
          }`}
        />
      </div>

      <div className="mt-auto pt-4 flex flex-wrap gap-2 text-xs items-center">
        <div className="h-3.5 w-20 rounded bg-white/10" />
        <div className="h-3.5 w-16 rounded bg-white/10" />
        <div className="h-3.5 w-24 rounded bg-white/10" />
      </div>
    </div>
  );
};

export default RepoCardSkeleton;
