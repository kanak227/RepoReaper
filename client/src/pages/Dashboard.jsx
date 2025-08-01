import { useEffect, useState } from "react";
import api from "../utils/api";
import RepoList from "../components/RepoList";
import Loader from "../components/Loader";
import DashboardNavbar from "../components/DashboardNavbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { Trash2 } from "lucide-react";


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
    <div className="min-h-screen p-6 lg:px-20 md:px-10">
      <DashboardNavbar img={img} user={user} />

      <div className="my-8 mr-5 flex justify-between items-center">
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
          className={`px-3 text-sm flex items-center gap-3 py-2 font-semibold mt-10 rounded-lg shadow transition-all
            ${
              selected.length === 0
                ? "bg-red-500/60 text-white cursor-not-allowed border border-red-500"
                : "bg-red-600 hover:from-red-700  hover:bg-red-600/80 text-white transition-colors duration-300"
            }
          `}
        >
          <Trash2 className="h-5 w-5" /> <span className="hidden md:inline"> Delete</span>
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

      <div className="rounded-xl shadow-lg p-4 mb-12 border border-blue-900">
        <RepoList repos={filteredRepos} selected={selected} setSelected={setSelected} />
      </div>

      <Footer/>
    </div>
  );
};


export default Dashboard;
