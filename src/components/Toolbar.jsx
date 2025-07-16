import React from 'react';

export default function Toolbar() {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-300">
      <div className="flex items-center space-x-4">
        {['Hide fields', 'Sort', 'Filter', 'Cell view'].map((label) => (
          <button
            key={label}
            className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            onClick={() => console.log(`${label} clicked`)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-3">
        <button onClick={() => console.log('Import clicked')} className="px-3 py-1 text-sm font-medium hover:bg-gray-100 rounded">Import</button>
        <button onClick={() => console.log('Export clicked')} className="px-3 py-1 text-sm font-medium hover:bg-gray-100 rounded">Export</button>
        <button onClick={() => console.log('Share clicked')} className="px-3 py-1 text-sm font-medium hover:bg-gray-100 rounded">Share</button>
        <button onClick={() => console.log('New Action clicked')} className="px-4 py-1 text-sm font-medium bg-green-500 text-white rounded hover:bg-green-600">New Action</button>
      </div>
    </div>
  );
}