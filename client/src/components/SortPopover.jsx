import React, { useRef, useEffect, useState } from 'react';
import Popover from './Popover';

/**
 * SortPopover - Modern ecommerce-style sort UI
 * Replaces dropdown with a popover containing:
 * - Sort by Name (A-Z)
 * - Sort by Date (Latest Updated)
 * - Sort by Size (Largest)
 */
const SortPopover = ({
  isOpen,
  onClose,
  onOpen,
  sortBy,
  onSort,
  mode = 'reaper', // 'reaper' (blue) or 'sweeper' (yellow)
}) => {
  const triggerRef = useRef(null);

  const [tempSort, setTempSort] = useState(sortBy || 'updated');

  useEffect(() => {
    if (isOpen) {
      setTempSort(sortBy || 'updated');
    }
  }, [isOpen, sortBy]);

  const accentColor = mode === 'reaper' ? 'blue' : 'yellow';
  const accentBorder =
    mode === 'reaper' ? 'border-blue-700' : 'border-yellow-700';
  const accentBg =
    mode === 'reaper'
      ? 'bg-blue-600 hover:bg-blue-700'
      : 'bg-yellow-600 hover:bg-yellow-700';
  const accentRing =
    mode === 'reaper' ? 'focus:ring-blue-400' : 'focus:ring-yellow-500';

  const sortOptions = [
    {
      value: 'updated',
      label: 'Latest Updated',
      description: 'Most recently updated first',
    },
    {
      value: 'size',
      label: 'Largest Size',
      description: 'Biggest repositories first',
    },
    {
      value: 'name',
      label: 'Name (A-Z)',
      description: 'Alphabetical order',
    },
  ];

  return (
    <>
      {/* Sort Button - Trigger */}
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
        <span>Sort</span>
      </button>

      {/* Sort Popover */}
      <Popover isOpen={isOpen} onClose={onClose} trigger={triggerRef.current}>
        <div className="space-y-1 p-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 px-3 py-3">
            <h3 className="text-sm font-semibold text-gray-100">Sort By</h3>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:text-gray-300"
              aria-label="Close sort menu"
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

          {/* Sort Options */}
          <div className="space-y-1 py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTempSort(option.value)}
                className={`w-full rounded-md px-3 py-3 text-left transition-all duration-200
                  ${
                    tempSort === option.value
                      ? `${accentBg} text-white shadow-md`
                      : 'text-gray-300 hover:bg-zinc-800/50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="text-xs text-gray-400">
                      {option.description}
                    </p>
                  </div>
                  {tempSort === option.value && (
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 px-3 pb-3">
            <button
              onClick={() => {
                // Reset temp sort to default
                setTempSort('updated');
              }}
              className={`flex-1 rounded-md border border-gray-600 px-3 py-2 text-sm font-medium
                text-gray-300 transition-colors duration-200 hover:border-gray-500 hover:text-gray-200`}
            >
              Reset
            </button>
            <button
              onClick={() => {
                onSort(tempSort);
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

export default SortPopover;
