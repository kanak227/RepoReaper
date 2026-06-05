import { SearchIcon } from 'lucide-react';
import React from 'react';
import styles from './SearchBar.module.css';
import { useAppStore } from '../store/app.store';


const SearchBar = ({
  search,
  onSearch,
  selectAll,
  onSelectAll,
  languages = [],
  language,
  onLanguage,
  visibility,
  onVisibility,
  forkStatus,
  onForkStatus
}) => {
  const { mode } = useAppStore();
  
  return (
    <div className="w-full px-2">
      <div className="mb-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-3 rounded-lg shadow-lg">
        {/* Search Input takes remaining width */}
        <div className="relative flex items-center w-full flex-1">
          <span className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${mode === 'reaper' ? 'text-blue-400' : 'text-yellow-500'}`}>
            <SearchIcon size={20} />
          </span>
          <input
            type="text"
            className={`w-full h-10 pl-10 pr-4 rounded-lg bg-zinc-900/10 text-white placeholder:text-white focus:outline-none transition-all duration-200 shadow-sm transition-colors border ${mode === 'reaper' ? 'border-blue-700 focus:ring-1 focus:ring-blue-400' : 'border-yellow-700 focus:ring-1 focus:ring-yellow-500'}`}
            placeholder="Search repositories..."
            value={search}
            onChange={onSearch}
          />
        </div>

        {/* Controls on the right side */}
        <div className="flex flex-row flex-wrap gap-3 items-center shrink-0 mt-1 lg:mt-0">
          <label className={`flex items-center gap-2 cursor-pointer transition-colors ${mode === 'reaper' ? 'text-blue-100 hover:text-blue-400' : 'text-yellow-100 hover:text-yellow-400'}`}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={onSelectAll}
              className={(mode === 'reaper' ? styles.customBlueCheckbox : styles.customYellowCheckbox) + ' w-4 h-4'}
            />
            <span className="text-sm font-medium">Select All</span>
          </label>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${mode === 'reaper' ? 'text-blue-100' : 'text-yellow-100'}`}>Language</span>
            <select
              value={language}
              onChange={onLanguage}
              className={`h-9 px-2 rounded bg-zinc-900/10 text-gray-400 text-sm outline-none ${mode === 'reaper' ? 'border-blue-700' : 'border-yellow-700'}`}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="text-gray-400">{lang}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${mode === 'reaper' ? 'text-blue-100' : 'text-yellow-100'}`}>Visibility</span>
            <select
              value={visibility}
              onChange={onVisibility}
              className={`h-9 px-2 rounded bg-zinc-900/10 text-gray-400 text-sm outline-none ${mode === 'reaper' ? 'border-blue-700' : 'border-yellow-700'}`}
            >
              <option value="All" className="text-gray-400">All</option>
              <option value="Public" className="text-gray-400">Public</option>
              <option value="Private" className="text-gray-400">Private</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${mode === 'reaper' ? 'text-blue-100' : 'text-yellow-100'}`}>Forks</span>
            <select
              value={forkStatus}
              onChange={onForkStatus}
              className={`h-9 px-2 rounded bg-zinc-900/10 text-gray-400 text-sm outline-none ${mode === 'reaper' ? 'border-blue-700' : 'border-yellow-700'}`}
            >
              <option value="All" className="text-gray-400">All</option>
              <option value="Forked" className="text-gray-400">Forked</option>
              <option value="Non-Forked" className="text-gray-400">Non-Forked</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
