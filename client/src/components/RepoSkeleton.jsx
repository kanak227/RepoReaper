const RepoSkeleton = () => {
  return (
    <div className="flex flex-col p-4 rounded-xl border border-gray-800 bg-black/40 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-5 w-32 bg-gray-700 rounded"></div>
        <div className="w-5 h-5 rounded-full bg-gray-700"></div>
      </div>

      <div className="mt-auto pt-4">
        <div className="h-3 w-20 bg-gray-700 rounded mb-2"></div>
        <div className="h-3 w-32 bg-gray-800 rounded"></div>
      </div>
    </div>
  );
};

export default RepoSkeleton;