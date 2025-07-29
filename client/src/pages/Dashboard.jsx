import { useEffect, useState } from "react";
import api from "../utils/api";
import RepoList from "../components/RepoList";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await api.get("/repos/list");
        setRepos(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching repos:", err);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete("/repos/delete", {
        data: { repos: selected },
      });
      setDeleted(true);
      setRepos((prev) => prev.filter((r) => !selected.includes(r.name)));
      setSelected([]);
    } catch (err) {
      console.error("Deletion failed", err);
    }
  };

  if (loading) return <div className="p-8">Loading repos...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Repositories</h1>

      {deleted && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          Selected repositories deleted successfully.
        </div>
      )}

      <RepoList repos={repos} selected={selected} setSelected={setSelected} />

      <button
        onClick={handleDelete}
        disabled={selected.length === 0}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
      >
        Delete Selected Repos
      </button>
    </div>
  );
};

export default Dashboard;
