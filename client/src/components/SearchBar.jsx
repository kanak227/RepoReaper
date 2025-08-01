import React from 'react';

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
    <div>
      <div className='bg-blue-900 w-full h-12 mb-3 flex items-center px-4 gap-4 rounded'>
        <input
          type='text'
          className='flex-1 h-8 px-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400'
          placeholder='Search repositories...'
          value={search}
          onChange={onSearch}
        />
        <label className='flex items-center gap-1 cursor-pointer'>
          <input
            type='checkbox'
            checked={selectAll}
            onChange={onSelectAll}
          />
          <span>{selectAll ? 'Deselect All' : 'Select All'}</span>
        </label>
        <label className='flex items-center gap-1 cursor-pointer'>
          <input
            type='checkbox'
            checked={forked}
            onChange={onForked}
          />
          <span>Forked</span>
        </label>
        <label className='flex items-center gap-1 cursor-pointer'>
          <input
            type='checkbox'
            checked={priv}
            onChange={onPriv}
          />
          <span>Private</span>
        </label>
      </div>
    </div>
  )
}

export default SearchBar
