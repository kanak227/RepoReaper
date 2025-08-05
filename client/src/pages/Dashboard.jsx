import { useEffect, useState } from "react";
import api from "../utils/api";
import RepoList from "../components/RepoList";
import Loader from "../components/Loader";
import DashboardNavbar from "../components/DashboardNavbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { AlertTriangle, Trash2 } from "lucide-react";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [userConfirmation, setUserConfirmation] = useState('');
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

  const confirmAndDelete = async () => {
  const confirmationText = `delete_permanently`;
  if (userConfirmation.trim() === confirmationText) {
    try {
      await api.delete("/repos/delete", {
        data: { repos: selected },
      });
      setDeleted(true);
      setDeleting(true);
      setRepos((prev) => prev.filter((r) => !selected.includes(r.full_name)));
      setSelected([]);
      setShowModal(false);
      setUserConfirmation('');
    } catch (err) {
      console.error("Deletion failed", err);
    }
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

  const [deleting, setDeleting] = useState(false);
  useEffect(() =>{
    const timer2 = setTimeout(() =>{
      setDeleting(false);
    } , 2000);
    return () => clearTimeout(timer2)
  } , [deleting]);

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
          onClick={() => setShowModal(true)}
          disabled={selected.length === 0}
          className={`px-3 text-sm flex items-center gap-3 py-2 font-semibold mt-10 rounded-lg shadow transition-all
              ${selected.length === 0
              ? "bg-red-500/60 text-white cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"}
                  `}
          >
        <Trash2/> <span className="hidden md:inline" >Delete</span>
        </button>

      </div>

      {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
    <div className="bg-black border border-red-900 p-10 rounded-xl w-full max-w-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-red-600 flex items-center gap-3"><AlertTriangle/>Confirm Deletion</h2>
      <p className="text-base text-red-500">
        You are about to delete these repositories:
      </p>
      <ul className="list-disc pl-6 text-sm text-white/70">
        {selected.map((repo) => (
          <li key={repo}>{repo}</li>
        ))}
      </ul>
      <p className="text-base text-red-500">
        Type <code className="font-bold text-red-900 px-1 rounded font-mono">{`'delete_permanently'`}</code> to confirm:
      </p>
      <input
        type="text"
        className="text-base w-full outline outline-1 outline-white focus:outline-none focus:ring-2 focus:ring-red-500 bg-transparent px-3 py-2 rounded mt-2"
        value={userConfirmation}
        onChange={(e) => setUserConfirmation(e.target.value)}
        placeholder="Type confirmation here"
      />
      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 border border-white rounded-md hover:bg-gray-400 hover:text-black transition-colors"
          onClick={() => {
            setShowModal(false);
            setUserConfirmation('');
          }}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded-md border border-red-500  ${
            userConfirmation.trim() === `delete_permanently`
              ? 'bg-red-600 text-white hover:bg-red-900 '
              : 'bg-transparent text-red-500 cursor-not-allowed'
          }`}
          onClick={confirmAndDelete}
          disabled={userConfirmation.trim() !== `delete_permanently`}
        >
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
)}

    { deleting && ( 
    <div className="bg-green-700/70  text-white-900 p-3 mb-6 rounded-lg shadow transition-all ">
          <span className="font-semibold">Success:</span> Selected repositories deleted successfully.
        </div>) 
}


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

      <div className="flex justify-between items-center px-3 text-sm text-gray-500 mb-1">
          <p>Selected : {selected.length}</p>
          <p>
            Total: {filteredRepos.length}
          </p>
        </div>

      <div className="rounded-xl shadow-lg p-4 mb-12 border border-blue-900">
        <RepoList repos={filteredRepos} selected={selected} setSelected={setSelected} />
      </div>
      <Footer/>
    </div>
  );
};


export default Dashboard;
