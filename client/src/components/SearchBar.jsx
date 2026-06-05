import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { useAppStore } from '../store/app.store';
import FilterPopover from './FilterPopover';
import SortPopover from './SortPopover';

/**
 * SearchBar - Refactored with modern ecommerce-style filters and sort
 * Maintains backward compatibility with existing props while providing
 * new popover-based UI for filters and sort
 */
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
  onForkStatus,
  // New props for sort functionality
  sortBy,
  onSort,
}) => {
  const { mode } = useAppStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="w-full px-2">
      <div className="mb-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-3 rounded-lg shadow-lg">
        {/* Search Input takes remaining width */}
        <div className="relative flex items-center w-full flex-1">
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
              mode === 'reaper' ? 'text-blue-400' : 'text-yellow-500'
            }`}
          >
            <SearchIcon size={20} />
          </span>
          <input
            type="text"
            className={`w-full h-10 pl-10 pr-4 rounded-lg bg-zinc-900/10 text-white placeholder:text-white focus:outline-none transition-all duration-200 shadow-sm transition-colors border ${
              mode === 'reaper'
                ? 'border-blue-700 focus:ring-1 focus:ring-blue-400'
                : 'border-yellow-700 focus:ring-1 focus:ring-yellow-500'
            }`}
            placeholder="Search repositories..."
            value={search}
            onChange={onSearch}
          />
        </div>

        {/* Controls on the right side */}
        <div className="flex flex-row flex-wrap gap-2 items-center shrink-0 mt-1 lg:mt-0">
          {/* Select All Checkbox - kept as is for backward compatibility */}
          <label
            className={`flex items-center gap-2 cursor-pointer transition-colors ${
              mode === 'reaper'
                ? 'text-blue-100 hover:text-blue-400'
                : 'text-yellow-100 hover:text-yellow-400'
            }`}
          >
            <input
              type="checkbox"
              checked={selectAll}
              onChange={onSelectAll}
              className={
                (mode === 'reaper'
                  ? styles.customBlueCheckbox
                  : styles.customYellowCheckbox) + ' w-4 h-4'
              }
            />
            <span className="text-sm font-medium whitespace-nowrap">
              Select All
            </span>
          </label>

          {/* Modern Filter Popover */}
          <div className="relative">
            <FilterPopover
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onOpen={() => setIsFilterOpen(true)}
              languages={languages}
              language={language}
              onLanguage={onLanguage}
              visibility={visibility}
              onVisibility={onVisibility}
              forkStatus={forkStatus}
              onForkStatus={onForkStatus}
              mode={mode}
            />
          </div>

          {/* Modern Sort Popover - only show if sortBy and onSort are provided */}
          {sortBy !== undefined && onSort !== undefined && (
            <div className="relative">
                <SortPopover
                  isOpen={isSortOpen}
                  onClose={() => setIsSortOpen(false)}
                  onOpen={() => setIsSortOpen(true)}
                  sortBy={sortBy}
                  onSort={onSort}
                  mode={mode}
                />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
