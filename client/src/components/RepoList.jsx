const RepoList = ({ repos, selected, setSelected }) => {
  const toggleSelect = (fullName) => {
    setSelected((prev) =>
      prev.includes(fullName)
        ? prev.filter((r) => r !== fullName)
        : [...prev, fullName]
    );
  };

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <ul className="space-y-2">
        {repos.map((repo) => {
          const isSelected = selected.includes(repo.full_name);
          return (
            <li
              key={repo.id}
              onClick={() => toggleSelect(repo.full_name)}
              className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors duration-200 ${
                isSelected ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'
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