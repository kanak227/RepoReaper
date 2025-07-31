import { useEffect, useState } from "react";
import api from "../utils/api";
import RepoList from "../components/RepoList";
import Loader from "../components/Loader";
import DashboardNavbar from "../components/DashboardNavbar";
import SearchBar from "../components/SearchBar";


const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [user , setUser] = useState("Guest");
  const [img , setImg] = useState("/logo.png");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await api.get("/repos/list");
        setRepos(res.data.repos);
        setUser(res.data.user);
        setImg(res.data.avatar);

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
      setRepos((prev) => prev.filter((r) => !selected.includes(r.full_name)));
      setSelected([]);
    } catch (err) {
      console.error("Deletion failed", err);
    }
  };

  if (loading) return <Loader/>

  return (
    <div className="p-6 lg:px-20 md:px-10">
      <DashboardNavbar img={img} user = {user} />
      <p className="text-white">Hello {user}</p>

      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-transparent bg-clip-text tracking-tight">
        Time to clean up your <span className="text-white">GitHub</span>
      </h1>

      <p className="text-white">Select, search, and sweep away the clutter — all from your control panel</p>

      {deleted && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          Selected repositories deleted successfully.
        </div>
      )}

      <SearchBar/>

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
