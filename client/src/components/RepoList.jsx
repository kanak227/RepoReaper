
const RepoList = ({ repos, selected, setSelected }) => {
  const toggleSelect = (fullName) => {
    setSelected((prev) =>
      prev.includes(fullName)
        ? prev.filter((r) => r !== fullName)
        : [...prev, fullName]
    );
  };

  return (
    <div
      className="max-h-[400px] overflow-y-auto custom-scrollbar"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#3b82f6 #18181b',
      }}
    >
      <ul className="space-y-2">
        {repos.map((repo) => {
          const isSelected = selected.includes(repo.full_name);
          return (
            <li
              key={repo.id}
              onClick={() => toggleSelect(repo.full_name)}
              className={`flex text-white items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                isSelected ? 'bg-green-300/10' : 'border-b border-white/30 hover:bg-blue-200/10'
              }`}
            >
              <span>{repo.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default RepoList;