import React, { useRef, useEffect, useState } from 'react';
import Popover from './Popover';

/**
 * FilterPopover - Modern ecommerce-style filter UI
 * Replaces multiple dropdowns with a single popover containing:
 * - Language filter
 * - Visibility filter (with toggle buttons)
 * - Fork status filter (with checkbox)
 */
const FilterPopover = ({
  isOpen,
  onClose,
  onOpen,
  languages,
  language,
  onLanguage,
  visibility,
  onVisibility,
  forkStatus,
  onForkStatus,
  mode = 'reaper', // 'reaper' (blue) or 'sweeper' (yellow)
}) => {
  const triggerRef = useRef(null);

  // Local temporary selections to avoid applying filters until Apply is clicked
  const [tempLanguage, setTempLanguage] = useState(language || 'All Languages');
  const [tempVisibility, setTempVisibility] = useState(visibility || 'All');
  const [tempForkStatus, setTempForkStatus] = useState(forkStatus || 'All');

  // Sync temp state when popover opens or when props change
  useEffect(() => {
    if (isOpen) {
      setTempLanguage(language || 'All Languages');
      setTempVisibility(visibility || 'All');
      setTempForkStatus(forkStatus || 'All');
    }
  }, [isOpen, language, visibility, forkStatus]);

  const accentColor = mode === 'reaper' ? 'blue' : 'yellow';
  const accentBorder =
    mode === 'reaper' ? 'border-blue-700' : 'border-yellow-700';
  const accentBg =
    mode === 'reaper'
      ? 'bg-blue-600 hover:bg-blue-700'
      : 'bg-yellow-600 hover:bg-yellow-700';
  const accentRing =
    mode === 'reaper' ? 'focus:ring-blue-400' : 'focus:ring-yellow-500';
  const accentText =
    mode === 'reaper' ? 'text-blue-400' : 'text-yellow-400';

  return (
    <>
      {/* Filter Button - Trigger */}
      <button
        ref={triggerRef}
        onClick={onOpen}
        className={`inline-flex items-center gap-2 rounded-md border ${accentBorder}
          px-3 py-2 text-sm font-medium text-gray-200 
          transition-colors duration-200 hover:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${accentRing}
          dark:border-gray-600 dark:text-gray-300`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span>Filters</span>
        {/* Badge showing active filters count */}
        {(language !== 'All Languages' ||
          visibility !== 'All' ||
          forkStatus !== 'All') && (
          <span
            className={`ml-1 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${accentBg} text-white`}
          >
            {[
              language !== 'All Languages',
              visibility !== 'All',
              forkStatus !== 'All',
            ].filter(Boolean).length}
          </span>
        )}
      </button>

      {/* Filter Popover */}
      <Popover isOpen={isOpen} onClose={onClose} trigger={triggerRef.current}>
        <div className="space-y-6 p-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-3">
            <h3 className="text-sm font-semibold text-gray-100">Filters</h3>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-300"
              aria-label="Close filters"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Language Filter - selectable list style */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Language
            </label>
            <div className="max-h-40 overflow-auto rounded-md border p-2 border-gray-700 bg-zinc-800">
              <button
                onClick={() => setTempLanguage('All Languages')}
                className={`w-full text-left px-2 py-1 rounded-md text-sm transition-colors mb-1
                  ${tempLanguage === 'All Languages' ? `${accentBg} text-white` : 'text-gray-300 hover:bg-zinc-900/40'}`}
              >
                All Languages
              </button>
              {languages && languages.length > 0 && (
                <div className="grid grid-cols-1 gap-1">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setTempLanguage(lang)}
                      className={`w-full text-left px-2 py-1 rounded-md text-sm transition-colors
                        ${tempLanguage === lang ? `${accentBg} text-white` : 'text-gray-300 hover:bg-zinc-900/40'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Visibility Filter - Toggle Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Visibility
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['All', 'Public', 'Private'].map((option) => (
                <button
                  key={option}
                  onClick={() => setTempVisibility(option)}
                  className={`rounded-md px-3 py-2 text-xs font-medium transition-all duration-200
                    ${
                      tempVisibility === option
                        ? `${accentBg} text-white shadow-md`
                        : 'border border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Fork Status Filter - Checkbox */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
              Fork Status
            </label>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempForkStatus === 'Forked'}
                  onChange={() => setTempForkStatus(tempForkStatus === 'Forked' ? 'All' : 'Forked')}
                  className="w-4 h-4 rounded border-gray-500 bg-zinc-800 text-white"
                  aria-label="Forked repositories only"
                />
                <span className={`text-sm font-medium ${tempForkStatus === 'Forked' ? 'text-white' : 'text-gray-300'}`}>
                  Forked only
                </span>
              </label>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                // Reset temp selections to defaults
                setTempLanguage('All Languages');
                setTempVisibility('All');
                setTempForkStatus('All');
              }}
              className={`flex-1 rounded-md border border-gray-600 px-3 py-2 text-sm font-medium
                text-gray-300 transition-colors duration-200 hover:border-gray-500 hover:text-gray-200`}
            >
              Reset
            </button>

            <button
              onClick={() => {
                // Apply temporary selections to parent state
                onLanguage && onLanguage({ target: { value: tempLanguage } });
                onVisibility && onVisibility({ target: { value: tempVisibility } });
                onForkStatus && onForkStatus({ target: { value: tempForkStatus } });
                onClose();
              }}
              className={`flex-1 rounded-md ${accentBg} px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:brightness-90`}
            >
              Apply
            </button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default FilterPopover;
