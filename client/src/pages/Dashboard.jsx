import { useEffect, useState } from "react";
import api from "../utils/api";
import RepoList from "../components/RepoList";
import Loader from "../components/Loader";
import DashboardNavbar from "../components/DashboardNavbar";
import SearchBar from "../components/SearchBar";


const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [forked, setForked] = useState(false);
  const [priv, setPriv] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
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


  // Debug: log repo structure
  // Remove or comment out after debugging
  if (repos.length > 0) {
    console.log('Sample repo:', repos[0]);
  }

  // Filter repos based on search, forked, and private
  const filteredRepos = repos.filter((repo) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      (repo.name && repo.name.toLowerCase().includes(searchLower)) ||
      (repo.full_name && repo.full_name.toLowerCase().includes(searchLower));
    const matchesForked = !forked || repo.fork;
    const matchesPriv = !priv || repo.private;
    return matchesSearch && matchesForked && matchesPriv;
  });

  // Select all/deselect all logic
  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all filtered
      setSelected((prev) => prev.filter((name) => !filteredRepos.some(r => r.full_name === name)));
    } else {
      // Select all filtered
      const filteredNames = filteredRepos.map(r => r.full_name);
      setSelected((prev) => Array.from(new Set([...prev, ...filteredNames])));
    }
    setSelectAll(!selectAll);
  };

  // Keep selectAll in sync with filtered selection
  useEffect(() => {
    const allFilteredSelected = filteredRepos.length > 0 && filteredRepos.every(r => selected.includes(r.full_name));
    setSelectAll(allFilteredSelected);
  }, [filteredRepos, selected]);



  if (loading) return <Loader/>

  return (
    <div className="min-h-screen  p-6 lg:px-20 md:px-10">
      <DashboardNavbar img={img} user={user} />

      <div className="my-8 flex justify-between items-center">
        <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 text-transparent bg-clip-text tracking-tight drop-shadow-lg">
          Time to clean up your <span className="text-white">GitHub</span>
        </h1>
        <p className="text-blue-100 mt-2 text-lg">
          Select, search, and sweep away the clutter 
        </p>
        </div>

        
        <button
          onClick={handleDelete}
          disabled={selected.length === 0}
          className={`px-4 py-3 font-semibold mt-3 rounded-lg shadow transition-all
            ${
              selected.length === 0
                ? "bg-red-500/60 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 via-red-650 to-red-600 hover:from-red-700 hover:to-pink-500 text-white hover:scale-105"
            }
          `}
        >
          🗑️ Delete Selected Repos
        </button>
      </div>
      

      {deleted && (
        <div className="bg-green-200/80 border border-green-400 text-green-900 p-3 mb-6 rounded-lg shadow transition-all animate-pulse">
          <span className="font-semibold">Success:</span> Selected repositories deleted successfully.
        </div>
      )}



      <div className="mb-6">
        <SearchBar
          search={search}
          onSearch={e => setSearch(e.target.value)}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          forked={forked}
          onForked={() => setForked(f => !f)}
          priv={priv}
          onPriv={() => setPriv(p => !p)}
        />
      </div>

      <div className="bg-white/5 rounded-xl shadow-lg p-6 mb-8 border border-blue-900/30">
        <RepoList repos={filteredRepos} selected={selected} setSelected={setSelected} />
      </div>

      
    </div>
  );
};

export default Dashboard;
