import { SearchIcon } from 'lucide-react';
import React from 'react';
import styles from './SearchBar.module.css';


const SearchBar = ({
  search,
  onSearch,
  selectAll,
  onSelectAll,
  forked,
  onForked,
  priv,
  onPriv
}) => {
  return (
    <div className="w-full px-2 md:px-5">
      <div className="mb-3 flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-center py-3 rounded-lg shadow-lg justify-between">
        <div className="relative flex items-center w-full lg:w-auto flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
            <SearchIcon size={20} />
          </span>
          <input
            type="text"
            className="lg:w-3/4 w-full h-10 pl-10 pr-4 rounded-lg border border-blue-700 bg-zinc-900/10 text-white placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-200 shadow-sm transition-colors"
            placeholder="Search repositories..."
            value={search}
            onChange={onSearch}
          />
        </div>

        <div className="flex flex-row gap-8 items-start w-full lg:w-auto">
          <label className="flex items-center gap-2 cursor-pointer text-blue-100 hover:text-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={onSelectAll}
              className={styles.customBlueCheckbox + ' w-4 h-4'}
            />
            <span className="text-sm font-medium">Select All</span>
          </label>


          <label className="flex items-center gap-2 cursor-pointer text-blue-100 hover:text-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={forked}
              onChange={onForked}
              className={styles.customBlueCheckbox + ' w-4 h-4'}
            />
            <span className="text-sm font-medium">Forked</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-blue-100 hover:text-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={priv}
              onChange={onPriv}
              className={styles.customBlueCheckbox + ' w-4 h-4'}
            />
            <span className="text-sm font-medium">Private</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
