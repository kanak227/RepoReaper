import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import RepoList from "../components/RepoList";
import Loader from "../components/Loader";
import DashboardNavbar from "../components/DashboardNavbar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { AlertTriangle, Trash2, Archive, Lock, ChevronDown, Check, StarOff } from "lucide-react";
import { Toaster, toast } from 'react-hot-toast';
import { useAppStore } from '../store/app.store';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [userConfirmation, setUserConfirmation] = useState('');
  const { mode } = useAppStore();
  const [repos, setRepos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [forked, setForked] = useState(false);
  const [priv, setPriv] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("updated");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);
  const [actionType, setActionType] = useState('');
  const [user , setUser] = useState("Guest");
  const [img , setImg] = useState("/logo.png");

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const endpoint = mode === 'reaper' ? "/repos/list" : "/repos/starred";
        const res = await api.get(endpoint);
        setRepos(res.data.repos);
        setUser(res.data.user);
        setImg(res.data.avatar);
        setSelected([]);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching repos:", err);
        setLoading(false);
      }
    };
    fetchRepos();
  }, [mode]); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const confirmAction = async () => {
    let expectedConfirmation = '';
    let endpoint = '';
    let actionName = '';
    let actionPast = '';
    
    if (actionType === 'delete') {
      expectedConfirmation = 'delete_permanently';
      endpoint = '/repos/delete';
      actionName = 'Deleting';
      actionPast = 'deleted';
    } else if (actionType === 'archive') {
      expectedConfirmation = 'archive_repos';
      endpoint = '/repos/archive';
      actionName = 'Archiving';
      actionPast = 'archived';
    } else if (actionType === 'private') {
      expectedConfirmation = 'make_private';
      endpoint = '/repos/make-private';
      actionName = 'Making private';
      actionPast = 'private';
    } else if (actionType === 'unstar') {
      expectedConfirmation = 'unstar_repos';
      endpoint = '/repos/unstar';
      actionName = 'Unstarring';
      actionPast = 'unstarred';
    }

    if (userConfirmation.trim() === expectedConfirmation) {
      const loadingToast = toast.loading(`${actionName} repositories...`);
      
      try {
        const res = actionType === 'delete' 
          ? await api.delete(endpoint, { data: { repos: selected } })
          : await api.post(endpoint, { repos: selected });
          
        const successRepos = res.data?.results?.filter(r => r.status === actionPast).map(r => r.repo) || selected;
        const failedRepos = res.data?.results?.filter(r => r.status === 'failed') || [];

        if (failedRepos.length > 0) {
          toast.error(`Failed to complete action for some repositories. Check console.`, { id: loadingToast });
          console.error(`Failed:`, failedRepos);
        } else {
          toast.success(`Successfully completed action!`, { id: loadingToast });
        }

        if (actionType === 'delete' || actionType === 'unstar') {
          setRepos((prev) => prev.filter((r) => !successRepos.includes(r.full_name)));
        } else if (actionType === 'private') {
          setRepos((prev) => prev.map((r) => successRepos.includes(r.full_name) ? { ...r, private: true } : r));
        }

        setSelected([]);
        setShowModal(false);
        setUserConfirmation('');
        setActionType('');
      } catch (err) {
        console.error(`${actionName} failed`, err);
        toast.error(err.response?.data?.error || "Action failed due to an error.", { id: loadingToast });
        setShowModal(false);
        setUserConfirmation('');
        setActionType('');
      }
    }
  };


  // Filter repos based on search, forked, and private
  let filteredRepos = repos.filter((repo) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      (repo.name && repo.name.toLowerCase().includes(searchLower)) ||
      (repo.full_name && repo.full_name.toLowerCase().includes(searchLower));
    const matchesForked = !forked || repo.fork;
    const matchesPriv = !priv || repo.private;
    return matchesSearch && matchesForked && matchesPriv;
  });

  filteredRepos.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'size') return (b.size || 0) - (a.size || 0);
    if (sortBy === 'updated') return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
    return 0;
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
      <Toaster position="top-right" />
      <DashboardNavbar img={img} user={user} />

      <div className="my-8 mr-5 flex justify-between items-center">
        <div>
        <h1 className={`text-4xl font-extrabold text-transparent bg-clip-text tracking-tight drop-shadow-lg ${mode === 'reaper' ? 'bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500' : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500'}`}>
          {mode === 'reaper' ? 'Time to clean up your ' : 'Time to sweep your '}<span className="text-white">GitHub</span>
        </h1>
        <p className="text-blue-100 mt-2 text-lg">
          {mode === 'reaper' ? 'Select, search, and sweep away the clutter' : 'Select, search, and unstar repositories you no longer need'}
        </p>
        </div>

        <div className="flex gap-3 mt-10 flex-wrap justify-end">
          <div className="relative hidden md:block" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="px-4 py-2 bg-gray-900/80 backdrop-blur-md text-white rounded-lg border border-gray-700 hover:border-blue-500/50 outline-none text-sm cursor-pointer flex items-center justify-between gap-2 shadow-sm transition-all"
            >
              <span>{sortBy === 'updated' ? 'Latest Updated' : sortBy === 'size' ? 'Largest Size' : 'Name (A-Z)'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] bg-gray-900/90 backdrop-blur-xl ring-1 ring-white/10 z-50 border border-gray-800 overflow-hidden transform opacity-100 scale-100 transition-all duration-200">
                <div className="p-1.5 flex flex-col gap-1">
                  {['updated', 'size', 'name'].map((option) => (
                    <button
                      key={option}
                      onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                      className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${sortBy === option ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                    >
                      {option === 'updated' ? 'Latest Updated' : option === 'size' ? 'Largest Size' : 'Name (A-Z)'}
                      {sortBy === option && <Check className="w-4 h-4 text-blue-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {mode === 'reaper' ? (
            <>
              <button
                onClick={() => { setShowModal(true); setActionType('private'); }}
                disabled={selected.length === 0}
                className={`px-3 text-sm flex items-center gap-2 py-2 font-semibold rounded-lg shadow transition-all
                    ${selected.length === 0 ? "bg-purple-500/30 text-white/50 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
              >
                <Lock className="w-4 h-4"/> <span className="hidden lg:inline">Make Private</span>
              </button>

              <button
                onClick={() => { setShowModal(true); setActionType('archive'); }}
                disabled={selected.length === 0}
                className={`px-3 text-sm flex items-center gap-2 py-2 font-semibold rounded-lg shadow transition-all
                    ${selected.length === 0 ? "bg-blue-500/30 text-white/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
              >
                <Archive className="w-4 h-4"/> <span className="hidden md:inline">Archive</span>
              </button>
              
              <button
                onClick={() => { setShowModal(true); setActionType('delete'); }}
                disabled={selected.length === 0}
                className={`px-3 text-sm flex items-center gap-2 py-2 font-semibold rounded-lg shadow transition-all
                    ${selected.length === 0 ? "bg-red-500/30 text-white/50 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"}`}
              >
                <Trash2 className="w-4 h-4"/> <span className="hidden md:inline">Delete</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => { setShowModal(true); setActionType('unstar'); }}
              disabled={selected.length === 0}
              className={`px-3 text-sm flex items-center gap-2 py-2 font-semibold rounded-lg shadow transition-all
                  ${selected.length === 0 ? "bg-yellow-500/30 text-white/50 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700 text-white"}`}
            >
              <StarOff className="w-4 h-4"/> <span className="hidden md:inline">Unstar</span>
            </button>
          )}
        </div>

      </div>

      {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
    <div className="bg-black border border-red-900 p-10 rounded-xl w-full max-w-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-red-600 flex items-center gap-3">
        <AlertTriangle/>Confirm {actionType === 'delete' ? "Deletion" : actionType === 'archive' ? "Archive" : actionType === 'unstar' ? "Unstar" : "Visibility Change"}
      </h2>
      <p className="text-base text-red-500">
        You are about to {actionType === 'delete' ? "delete" : actionType === 'archive' ? "archive" : actionType === 'unstar' ? "unstar" : "make private"} these repositories:
      </p>
      <ul className="list-disc pl-6 text-sm text-white/70">
        {selected.map((repo) => (
          <li key={repo}>{repo}</li>
        ))}
      </ul>
      <p className="text-base text-red-500">
        Type <code className="font-bold text-red-900 px-1 rounded font-mono">{actionType === 'delete' ? "'delete_permanently'" : actionType === 'archive' ? "'archive_repos'" : actionType === 'unstar' ? "'unstar_repos'" : "'make_private'"}</code> to confirm:
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
          className={`px-4 py-2 rounded-md border  ${
            userConfirmation.trim() === (actionType === 'delete' ? 'delete_permanently' : actionType === 'archive' ? 'archive_repos' : actionType === 'unstar' ? 'unstar_repos' : 'make_private')
              ? (actionType === 'delete' ? 'border-red-500 bg-red-600 text-white hover:bg-red-900' : actionType === 'archive' ? 'border-blue-500 bg-blue-600 text-white hover:bg-blue-800' : actionType === 'unstar' ? 'border-yellow-500 bg-yellow-600 text-white hover:bg-yellow-800' : 'border-purple-500 bg-purple-600 text-white hover:bg-purple-800')
              : 'border-gray-600 bg-transparent text-gray-500 cursor-not-allowed'
          }`}
          onClick={confirmAction}
          disabled={userConfirmation.trim() !== (actionType === 'delete' ? 'delete_permanently' : actionType === 'archive' ? 'archive_repos' : actionType === 'unstar' ? 'unstar_repos' : 'make_private')}
        >
          Confirm {actionType === 'delete' ? 'Delete' : actionType === 'archive' ? 'Archive' : actionType === 'unstar' ? 'Unstar' : 'Make Private'}
        </button>
      </div>
    </div>
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

      <div className="flex justify-between items-center px-3 text-sm text-gray-500 mb-1">
          <p>Selected : {selected.length}</p>
          <p>
            Total: {filteredRepos.length}
          </p>
        </div>

      <div className="mb-12">
        <RepoList repos={filteredRepos} selected={selected} setSelected={setSelected} />
      </div>
      <Footer/>
    </div>
  );
};


export default Dashboard;
