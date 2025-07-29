const RepoList = ({ repos, selected, setSelected }) => {
  const toggleSelect = (fullName) => {
    setSelected((prev) =>
      prev.includes(fullName) ? prev.filter((r) => r !== fullName) : [...prev, fullName]
    );
  };

  return (
    <ul className="space-y-2">
      {repos.map((repo) => (
        <li
          key={repo.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded"
        >
          <span>{repo.full_name}</span>
          <input
            type="checkbox"
            checked={selected.includes(repo.full_name)}
            onChange={() => toggleSelect(repo.full_name)}
          />
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
