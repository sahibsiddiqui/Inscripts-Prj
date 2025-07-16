import React from 'react';

const tabs = ['All Orders', 'Pending', 'Reviewed', 'Arrived', '+'];
export default function Tabs({ active = 'All Orders', onSelect }) {
  return (
    <div className="flex bg-white border-t border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect?.(tab)}
          className={`flex-1 py-3 text-center text-sm font-medium ${tab === active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}